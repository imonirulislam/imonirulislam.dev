"use client";

import Link from "next/link";
import { MoveLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 font-mono">
      <div className="z-10 flex max-w-lg flex-col items-center space-y-8 text-center">
        {/* Error Code Block */}
        <div className="bg-pop-pink border-border shadow-brutal-lg relative -rotate-1 border-2 px-12 pt-10 pb-8 text-black">
          <div className="bg-card border-border absolute -top-4 left-1/2 -translate-x-1/2 border-2 px-4 py-1 whitespace-nowrap">
            <div className="text-foreground flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
              <AlertTriangle className="h-4 w-4" />
              Critical_System_Failure
            </div>
          </div>

          <h1 className="font-sans text-8xl font-bold tracking-tighter select-none">
            404
          </h1>
          <div className="mt-2 text-xs font-bold tracking-[0.2em] uppercase">
            ERR_MODULE_NOT_FOUND
          </div>
        </div>

        {/* Stack Trace Simulation */}
        <div className="w-full space-y-2 text-left">
          <div className="bg-card border-border text-muted-foreground shadow-brutal border-2 p-4 font-mono text-[10px]">
            <p className="text-destructive mb-2 font-bold">
              Error: The requested resource could not be found in the system
              registry.
            </p>
            <div className="space-y-1">
              <p>&nbsp;&nbsp;at Route.navigate (src/app/router.ts:404:21)</p>
              <p>&nbsp;&nbsp;at Navigation.dispatch (src/core/nav.ts:133:07)</p>
              <p>&nbsp;&nbsp;at System.render (src/kernel/render.ts:89:12)</p>
              <p className="text-primary mt-2">
                &gt; Core dump saved to /var/log/sys_crash.log
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group bg-pop-yellow border-border shadow-brutal brutal-press relative inline-flex items-center gap-2 border-2 px-8 py-3 text-xs font-bold tracking-widest text-black uppercase"
        >
          <MoveLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          <span>Reboot_System</span>
        </Link>
      </div>
    </div>
  );
}
