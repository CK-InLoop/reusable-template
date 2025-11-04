// D1 Database client for Cloudflare D1
// In development, this will use local SQLite
// In production (Cloudflare Pages), this will use D1 binding

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  exec(query: string): Promise<D1Result>;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = any>(): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = any>(): Promise<D1Result<T>>;
}

interface D1Result<T = any> {
  success: boolean;
  meta: {
    changes: number;
    last_insert_rowid: number;
    duration: number;
  };
  results?: T[];
}

// Types for our database models
export interface User {
  id: string;
  email: string;
  password: string | null;
  name: string | null;
  image: string | null;
  role: string;
  emailVerified: number; // SQLite stores booleans as integers
  emailVerificationToken: string | null;
  emailVerificationExpires: number | null;
  createdAt: number;
}

// Get D1 database instance
// This will be available in Cloudflare Workers/Pages environment
function getD1Database(): D1Database | null {
  // For Cloudflare Pages/Workers, D1 is available via runtime env
  // In Next.js with @cloudflare/next-on-pages, it's available via process.env
  if (typeof process !== 'undefined') {
    // Check for Cloudflare Pages binding (when using @cloudflare/next-on-pages)
    if ((process.env as any).DB) {
      return (process.env as any).DB;
    }
    // Check for direct binding in request context (for API routes)
    const requestContext = (globalThis as any).__CF_PAGES__;
    if (requestContext?.env?.DB) {
      return requestContext.env.DB;
    }
  }
  
  // For Cloudflare Workers runtime
  if (typeof (globalThis as any).DB !== 'undefined') {
    return (globalThis as any).DB;
  }
  
  // For local development with Wrangler, check for --local binding
  // Note: For local development, use `wrangler pages dev` to access D1
  return null;
}

export const db = {
  // User operations
  async getUserByEmail(email: string): Promise<User | null> {
    const database = getD1Database();
    if (!database) {
      throw new Error('D1 database not available. Make sure you are running in Cloudflare Workers environment or have configured local D1.');
    }
    
    const result = await database
      .prepare('SELECT * FROM User WHERE email = ?')
      .bind(email)
      .first<User>();
    
    return result || null;
  },

  async getUserById(id: string): Promise<User | null> {
    const database = getD1Database();
    if (!database) {
      throw new Error('D1 database not available.');
    }
    
    const result = await database
      .prepare('SELECT * FROM User WHERE id = ?')
      .bind(id)
      .first<User>();
    
    return result || null;
  },

  async getUserByVerificationToken(token: string): Promise<User | null> {
    const database = getD1Database();
    if (!database) {
      throw new Error('D1 database not available.');
    }
    
    const result = await database
      .prepare('SELECT * FROM User WHERE emailVerificationToken = ? AND emailVerificationExpires > ?')
      .bind(token, Date.now())
      .first<User>();
    
    return result || null;
  },

  async createUser(data: {
    id: string;
    email: string;
    password: string;
    name?: string;
    emailVerificationToken: string;
    emailVerificationExpires: number;
  }): Promise<User> {
    const database = getD1Database();
    if (!database) {
      throw new Error('D1 database not available.');
    }
    
    const now = Math.floor(Date.now() / 1000);
    
    await database
      .prepare(
        'INSERT INTO User (id, email, password, name, role, emailVerified, emailVerificationToken, emailVerificationExpires, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
      .bind(
        data.id,
        data.email,
        data.password,
        data.name || null,
        'user',
        0,
        data.emailVerificationToken,
        data.emailVerificationExpires,
        now
      )
      .run();
    
    const user = await this.getUserById(data.id);
    if (!user) {
      throw new Error('Failed to create user');
    }
    
    return user;
  },

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const database = getD1Database();
    if (!database) {
      throw new Error('D1 database not available.');
    }
    
    const updates: string[] = [];
    const values: any[] = [];
    
    if (data.email !== undefined) {
      updates.push('email = ?');
      values.push(data.email);
    }
    if (data.password !== undefined) {
      updates.push('password = ?');
      values.push(data.password);
    }
    if (data.name !== undefined) {
      updates.push('name = ?');
      values.push(data.name);
    }
    if (data.image !== undefined) {
      updates.push('image = ?');
      values.push(data.image);
    }
    if (data.role !== undefined) {
      updates.push('role = ?');
      values.push(data.role);
    }
    if (data.emailVerified !== undefined) {
      updates.push('emailVerified = ?');
      values.push(data.emailVerified);
    }
    if (data.emailVerificationToken !== undefined) {
      updates.push('emailVerificationToken = ?');
      values.push(data.emailVerificationToken);
    }
    if (data.emailVerificationExpires !== undefined) {
      updates.push('emailVerificationExpires = ?');
      values.push(data.emailVerificationExpires);
    }
    
    if (updates.length === 0) {
      const user = await this.getUserById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    }
    
    values.push(id);
    
    await database
      .prepare(`UPDATE User SET ${updates.join(', ')} WHERE id = ?`)
      .bind(...values)
      .run();
    
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  },
};
