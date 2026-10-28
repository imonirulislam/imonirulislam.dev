"use client";

import Link from "next/link";
import { MoveLeft, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-4 font-mono">
      {/* Background Glitch Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-[20%] left-[10%] h-32 w-32 rounded-full bg-red-500/20 blur-3xl filter" />
        <div className="absolute right-[10%] bottom-[20%] h-32 w-32 rounded-full bg-red-500/10 blur-3xl filter" />
      </div>

      <div className="z-10 flex max-w-lg flex-col items-center space-y-8 text-center">
        {/* Error Code Block */}
        <div className="bg-destructive/10 border-destructive/20 relative rounded-lg border p-8">
          <div className="bg-background absolute -top-3 left-1/2 -translate-x-1/2 px-4">
            <div className="text-destructive flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
              <AlertTriangle className="h-4 w-4" />
              Critical_System_Failure
            </div>
          </div>

          <h1 className="from-foreground to-foreground/50 bg-gradient-to-b bg-clip-text text-6xl font-black tracking-tighter text-transparent select-none">
            404
          </h1>
          <div className="text-muted-foreground mt-2 text-xs tracking-[0.2em] uppercase">
            ERR_MODULE_NOT_FOUND
          </div>
        </div>

        {/* Stack Trace Simulation */}
        <div className="w-full space-y-2 text-left">
          <div className="bg-border/50 h-px w-full" />
          <div className="bg-secondary border-border text-muted-foreground rounded border p-4 font-mono text-[10px]">
            <p className="text-destructive mb-2 font-bold">
              Error: The requested resource could not be found in the system
              registry.
            </p>
            <div className="space-y-1 opacity-60">
              <p>&nbsp;&nbsp;at Route.navigate (src/app/router.ts:404:21)</p>
              <p>&nbsp;&nbsp;at Navigation.dispatch (src/core/nav.ts:133:07)</p>
              <p>&nbsp;&nbsp;at System.render (src/kernel/render.ts:89:12)</p>
              <p className="text-primary/40 mt-2">
                &gt; Core dump saved to /var/log/sys_crash.log
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="group border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover: relative inline-flex items-center gap-2 overflow-hidden rounded-md border px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all"
        >
          <MoveLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
          <span>Reboot_System</span>
        </Link>
      </div>
    </div>
  );
}
