"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";

type SupplierNameProps = {
  name: string;
  href?: string;
};

const twoLineClampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  height: "2rem",
  maxHeight: "2rem",
};

export default function SupplierName({ name, href }: SupplierNameProps) {
  const nameRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const nameElement = nameRef.current;
    if (!nameElement) return;

    const measure = () => {
      setIsTruncated(nameElement.scrollHeight > nameElement.clientHeight + 1);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nameElement);
    return () => observer.disconnect();
  }, [name]);

  return (
    <span className="group/supplier-name relative block">
      {href ? (
        <Link
          href={href}
          title={isTruncated ? name : undefined}
          aria-describedby={isTruncated ? tooltipId : undefined}
          className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2"
        >
          <span
            ref={nameRef}
            style={twoLineClampStyle}
            className="text-xs font-semibold leading-4 text-[#0b4f82]"
          >
            {name}
          </span>
        </Link>
      ) : (
        <span
          ref={nameRef}
          tabIndex={isTruncated ? 0 : undefined}
          title={isTruncated ? name : undefined}
          aria-describedby={isTruncated ? tooltipId : undefined}
          style={twoLineClampStyle}
          className="rounded-sm text-xs font-semibold leading-4 text-[#0b4f82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0b4f82] focus-visible:ring-offset-2"
        >
          {name}
        </span>
      )}
      {isTruncated && (
        <span
          id={tooltipId}
          role="tooltip"
          className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-50 w-max max-w-56 -translate-x-1/2 rounded-md bg-slate-900 px-2.5 py-1.5 text-left text-xs font-medium leading-4 text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/supplier-name:opacity-100 group-focus-within/supplier-name:opacity-100 motion-reduce:transition-none"
        >
          {name}
        </span>
      )}
    </span>
  );
}
