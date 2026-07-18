"use client";

import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const RESUME_PATH = "/documents/dr-dattatraya-vhatkar-resume.pdf";
const RESUME_FILENAME = "Dr-Dattatraya-Vhatkar-Resume.pdf";

export function ResumeViewer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden border border-border-strong bg-background-elevated"
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2 text-foreground-muted">
          <FileText size={15} strokeWidth={1.75} />
          <span className="font-mono text-xs">{RESUME_FILENAME}</span>
        </div>
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noreferrer"
          aria-label="Open resume in a new tab"
          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted transition-colors hover:text-accent"
        >
          <ExternalLink size={15} strokeWidth={1.75} />
        </a>
      </div>

      {/* Native PDF embed — reliable on desktop browsers. Mobile browsers
          render inline PDFs inconsistently, so we show a cover state instead. */}
      <div className="hidden aspect-[8.5/11] w-full bg-background-inset md:block">
        <iframe
          src={`${RESUME_PATH}#view=FitH`}
          title="Dr Dattatraya Vhatkar — Resume preview"
          className="h-full w-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 px-6 py-16 text-center md:hidden">
        <FileText className="text-accent" size={40} strokeWidth={1.25} />
        <p className="max-w-xs text-sm text-foreground-muted">
          Open the resume directly for the best reading experience on mobile.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 border-t border-border px-6 py-6">
        <a href={RESUME_PATH} target="_blank" rel="noreferrer">
          <Button>
            <ExternalLink size={14} /> View Resume
          </Button>
        </a>
        <a href={RESUME_PATH} download={RESUME_FILENAME}>
          <Button variant="outline">
            <Download size={14} /> Download PDF
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
