const fs = require('fs');
let content = fs.readFileSync('app/page.tsx', 'utf8');

const targetStr = '{/* FAQ */}';

const aboutFounderSection = `{/* About Founder */}
        <section className="relative overflow-hidden bg-background py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.05),transparent_50%)]" />
          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <Badge
              variant="outline"
              className="mb-8 gap-1.5 border-amber-200 bg-amber-50 px-3 py-1 font-mono text-[11px] text-amber-600 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400"
            >
              <Sparkles size={12} />
              A note from the founder
            </Badge>
            
            <div className="relative mx-auto mb-8 h-28 w-28 overflow-hidden rounded-full border-4 border-background shadow-[0_0_0_2px_rgba(245,158,11,0.2)]">
              {/* Using PICCC name per user request. Fallback provided if image doesn't load. */}
              <Image 
                src="/PICCC.jpg" 
                alt="Anubhav - Founder" 
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/logo.png";
                  e.currentTarget.style.objectFit = "contain";
                  e.currentTarget.style.padding = "0.5rem";
                  e.currentTarget.style.backgroundColor = "#fffbeb";
                }}
              />
            </div>

            <h2 className="mb-6 font-mono text-xl font-bold text-foreground md:text-2xl">
              "I built PatternFlow because I was exhausted by the standard LeetCode grind."
            </h2>
            
            <div className="mx-auto max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
              <p>
                Memorizing solutions doesn&apos;t work. I wanted a tool that actually taught me <em>how to think</em> and how to recognize patterns intuitively, just like a senior engineer does.
              </p>
              <p>
                That&apos;s why I created PatternFlow — to help you stop memorizing, and start understanding. 
              </p>
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <div className="text-left">
                <p className="font-mono text-sm font-bold text-foreground">Anubhav</p>
                <p className="font-mono text-xs text-muted-foreground">Founder, PatternFlow</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}`;

content = content.replace(targetStr, aboutFounderSection);
fs.writeFileSync('app/page.tsx', content);
console.log("Successfully injected 'About Founder' section using simpler string replace!");
