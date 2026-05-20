const fs = require('fs');
const util = require('util');
const path = require('path');

const localHtmlPath = path.join(__dirname, 'inbound-readiness-scorer.html');
const fallbackHtmlPath = '/home/thomas/Digital Products/Patreon/RECRUITED Digital Products/inbound-readiness-scorer.html';
const htmlPath = fs.existsSync(localHtmlPath) ? localHtmlPath : fallbackHtmlPath;
console.log("Loading HTML...");
let content = fs.readFileSync(htmlPath, 'utf8');

// Define ACTIONS_DATABASE as a native JavaScript object literal.
// This allows Node to parse the strings correctly and securely at compile time.
const ACTIONS_DATABASE = {
  linkedin: {
    '0-2': [
      {
        id: 'linkedin_publish_first',
        title: 'Publish your first post today',
        why: 'Establish that your profile is active so recruiters immediately know you are approachable.',
        steps: [
          'Navigate to LinkedIn.com.',
          'Select a topic from your specified professional niche (e.g. your latest project or learning experience).',
          'Draft an observation in 150-200 words directly in the editor.',
          'Click Publish before closing this browser tab.'
        ],
        integration: {
          platform: 'LinkedIn Feed',
          steps: [
            'Go to linkedin.com → Click "Start a post" at the feed header.',
            'Input: "This week I\'m deep diving into [Niche]. The most surprising thing I discovered is [Concept] because [Reason]." Keep paragraphs to 1-2 sentences.',
            'Do not paste external links inside the post itself. Put them in the comments to protect algorithmic weight.',
            'Click "Post" and reply to any comments within 30 minutes.'
          ]
        },
        impact: 4,
        effort: 'Quick (< 30 min)'
      },
      {
        id: 'linkedin_posting_schedule',
        title: 'Set a 3-post/week publishing commitment',
        why: 'The LinkedIn search index rewards recency and regular output. Inconsistency kills your reach.',
        steps: [
          'Open your calendar tool (Google Calendar, Outlook, etc.).',
          'Select 3 days in the upcoming week (Monday, Wednesday, Friday).',
          'Create recurring 30-minute timeblocks titled "LinkedIn Content Writing".',
          'Commit to writing and publishing at least one niche observation during each block.'
        ],
        integration: {
          platform: 'Calendar',
          steps: [
            'Set time blocks for exactly 7:30 AM to 8:00 AM on Mon, Wed, Fri.',
            'Prepare 3 standard templates in a local text file: Monday (Tool Review), Wednesday (Error Fix), Friday (Weekly Lesson).',
            'Write the draft the night before, review, and post at precisely 8:00 AM.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'linkedin_creator_mode',
        title: 'Activate Creator Mode on your profile',
        why: 'Enables follow mechanics, newsletter features, and lets you display up to 5 custom topic hashtags on your bio.',
        steps: [
          'Navigate to your LinkedIn Profile page.',
          'Scroll down to the "Resources" section.',
          'Click "Creator Mode" (currently showing Off).',
          'Select 5 topic hashtags that define your professional niche, and toggle the mode to ON.'
        ],
        integration: {
          platform: 'LinkedIn Creator Mode',
          steps: [
            'Go to linkedin.com/in/[username] → Scroll to Resources.',
            'Click Creator Mode → Next.',
            'Add 5 specific tags (e.g. #platformengineering, #kubernetes, #cloudnative).',
            'Turn on. Your profile primary button will shift from "Connect" to "Follow".'
          ]
        },
        impact: 2.5,
        effort: 'Quick (< 30 min)'
      },
      {
        id: 'linkedin_headline_formula',
        title: 'Apply the premium positioning headline formula',
        why: 'Your headline is the single highest-weighted field in LinkedIn Recruiter keyword queries.',
        steps: [
          'Open your profile settings.',
          'Remove standard job titles like "Developer at X" or "Seeking Opportunities".',
          'Apply the formula: [Role] | [Niche Keyword] | [Value Prop / Specific Target Outcome].'
        ],
        integration: {
          platform: 'LinkedIn Headline',
          steps: [
            'Click the Edit pencil icon at your profile top card.',
            'Write headline: "[Target Role] | Helping [Specific Audience] achieve [Desired Outcome] through [Method] | [Key Tech Stack]"',
            'Example: "DevOps Engineer | Automating Cloud Infrastructure to Cut Deploy Costs by 40% | AWS, Terraform, Kubernetes"',
            'Save changes and verify formatting on mobile.'
          ]
        },
        impact: 3.5,
        effort: 'Quick (< 30 min)'
      }
    ],
    '5-6': [
      {
        id: 'linkedin_featured_section',
        title: 'Add a Featured section with your top 3 content pieces',
        why: 'Featured sections act as visual landing pages. Unfeatured profiles lose 60% of visitor conversion potential.',
        steps: [
          'Click "Add profile section" on your bio.',
          'Choose "Recommended" and select "Featured".',
          'Pin your top-performing LinkedIn post, a link to your public portfolio, and a case study.'
        ],
        integration: {
          platform: 'LinkedIn Featured',
          steps: [
            'Go to your profile → Add Profile Section → Recommended → Add Featured.',
            'Click the "+" icon → Link / Post.',
            'Add (1) link to GitHub profile, (2) your best LinkedIn post, (3) link to a published Case Study.',
            'Ensure each featured item has a customized thumbnail image and a clear call-to-action title.'
          ]
        },
        impact: 2,
        effort: 'Quick (< 30 min)'
      }
    ],
    '7-8': [
      {
        id: 'linkedin_analytics_review',
        title: 'Analyse engagement to double down on high-reach topics',
        why: 'Scale what works. Double down on content topics that receive 3x the average engagement.',
        steps: [
          'Open your LinkedIn Analytics dashboard.',
          'Identify the 3 content posts from the last 30 days with the highest impression count.',
          'Deconstruct why they worked (hook style, formatting, controversy, value).',
          'Schedule 4 new posts that deep dive into those exact sub-topics.'
        ],
        integration: {
          platform: 'LinkedIn Analytics',
          steps: [
            'Go to linkedin.com/analytics/creator-analytics/posts/ → Filter by last 90 days.',
            'Identify posts with comments count > average.',
            'Map those topics to a secondary "advanced content calendar" for next month.'
          ]
        },
        impact: 1.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'linkedin_newsletter_launch',
        title: 'Enable LinkedIn Newsletter and publish your first edition',
        why: 'Newsletters trigger in-app and email notifications to all your connections, compounding reach organically.',
        steps: [
          'Verify Creator Mode is active.',
          'Click "Write an article" at your home feed header.',
          'Click "Create a newsletter" inside the editor settings.',
          'Publish your first monthly edition outlining a contrarian niche lesson.'
        ],
        integration: {
          platform: 'LinkedIn Newsletter',
          steps: [
            'Click "Write article" at top feed → "Create Newsletter".',
            'Set Title: "[Niche] Engineering Insights" + Upload Logo.',
            'Write first article (800 words): "The Core Architecture Mistake Professionals Make on [Niche] in 2026".',
            'Publish and invite all connections to subscribe.'
          ]
        },
        impact: 1,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  brand: {
    '0-2': [
      {
        id: 'brand_venn_exercise',
        title: 'Complete the Three-Circle Venn exercise from Chapter 8',
        why: 'You cannot scale visibility until you define exactly what you want to be visible for.',
        steps: [
          'Allocate 90 minutes of quiet, uninterrupted time this week.',
          'Write down: Circle 1 (What you know deeply), Circle 2 (What the market pays for), Circle 3 (What you can teach publicly).',
          'Locate the overlapping intersection points to extract a laser-focused niche.'
        ],
        integration: {
          platform: 'Personal Brand Document',
          steps: [
            'Create a document titled "My Personal Niche Definition".',
            'Write down 5 niche candidates at the overlap of expertise and market demand.',
            'Validate against the RECRUITED anti-generic filter rules.'
          ]
        },
        impact: 4,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'brand_tagline_rewrite',
        title: 'Write your positioning statement using the Chapter 8 template',
        why: 'A solid positioning statement acts as your brand filter, making your professional focus instantly clear to recruiters.',
        steps: [
          'Review the Venn diagram overlaps from your previous exercises.',
          'Write your statement: "I help [Target Client/Audience] solve [Specific High-Value Problem] through [Your Signature Method]."',
          'Share it with 3 peers or mentors to verify clarity and uniqueness.'
        ],
        integration: {
          platform: 'Positioning Statement Card',
          steps: [
            'Write your statement out inside your target document profile.',
            'Test: Does this sound generic? If yes, narrow the target audience (e.g. from "startups" to "series-A SaaS teams").',
            'Pin this at the very top of your digital workspace for consistency.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'brand_cross_platform',
        title: 'Audit cross-platform brand consistency',
        why: 'Disjointed positioning across channels signals instability to background recruiters.',
        steps: [
          'Open all professional accounts: LinkedIn, GitHub, Twitter/X, Dev.to.',
          'Verify that your profile photo, headline, and bio are aligned across all directories.',
          'Apply the exact same target positioning phrase to all active channel bios.'
        ],
        integration: {
          platform: 'Cross-platform Audit',
          steps: [
            'Update matching headshot across accounts (LinkedIn, GitHub, Dev.to).',
            'Copy your exact premium headline and place it as the bio on dev.to and GitHub.',
            'Ensure linked profiles connect correctly to each other.'
          ]
        },
        impact: 2.5,
        effort: 'Quick (< 30 min)'
      }
    ],
    '5-6': [
      {
        id: 'brand_antigeneric_filter',
        title: 'Run positioning statement through the anti-generic filter',
        why: 'If any other competitor in your field can copy/paste your positioning, you are invisible in search results.',
        steps: [
          'Take your positioning tagline and evaluate it against three competitors.',
          'List 3 terms that are overused in your niche (e.g., "results-driven", "passionate developer").',
          'Eliminate those terms and replace them with specific, metric-backed outcomes (e.g. "reduced deployment latency by 45%").'
        ],
        integration: {
          platform: 'Niche Verification',
          steps: [
            'Print your tagline. Highlight all buzzwords.',
            'Rewrite those words using active proof verbs and actual tech stack dependencies.',
            'Update your LinkedIn headline with this highly concrete version.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '7-8': [
      {
        id: 'brand_target_audience_focus',
        title: 'Define your target hiring manager profiles',
        why: 'Directing your personal brand statement to specific company archetypes boosts recruiter click rates.',
        steps: [
          'Analyze the 10 target companies listed in your outreach logs.',
          'Determine the exact job titles of the decision makers (e.g., Engineering Manager, VP of Platform).',
          'Customize your brand taglines to directly speak to the specific corporate goals of those manager personas.'
        ],
        integration: {
          platform: 'Manager Target Profiling',
          steps: [
            'Search for 5 managers in target companies using LinkedIn Search.',
            'Document their featured posts: what issues are they currently complaining about or solving?',
            'Refine your LinkedIn bio so it outlines exactly how you resolve those specific issues.'
          ]
        },
        impact: 2,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'brand_signature_framework',
        title: 'Create and document your signature methodology',
        why: 'Having a proprietary framework places you at the pinnacle of domain authority and sets high pricing power.',
        steps: [
          'Synthesize your core execution flow into a 3-step or 4-step named framework (e.g. The RECRUITED Pipeline).',
          'Draft an infographic or simple visual diagram illustrating the flow.',
          'Publish a detailed guide explaining how this framework saves target employers time or capital.'
        ],
        integration: {
          platform: 'Signature Framework Playbook',
          steps: [
            'Draft a 1000-word deep-dive article detailing your signature framework steps.',
            'Embed a clean diagram generated using an online tool like Mermaid.js or Canva.',
            'Add this article link to your LinkedIn bio and Featured list.'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  portfolio: {
    '0-2': [
      {
        id: 'portfolio_github_setup',
        title: 'Create and structure your public GitHub profile',
        why: 'A blank Google search represents an immediate hire risk. Public repositories prove practical knowledge.',
        steps: [
          'Go to github.com and sign up for a free developer account.',
          'Structure your profile settings with your real name, premium headshot, and matching tagline.',
          'Create a customized username repository for a profile README.'
        ],
        integration: {
          platform: 'GitHub Setup',
          steps: [
            'Sign up or login at github.com.',
            'Create a new public repo with the name matching your username (e.g. github.com/user/user).',
            'Add a README.md and write: "Hi, I\'m [Name] | [Niche] | Currently building [Project]." Save.'
          ]
        },
        impact: 3.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'portfolio_pin_repos',
        title: 'Pin 3 high-quality repositories on your profile',
        why: 'Recruiters scan pinned items within 3 seconds. Pinned code represents your formal proof of work.',
        steps: [
          'Identify your 3 strongest technical or case study repositories.',
          'Click "Customize your pins" on your GitHub main profile page.',
          'Select these three items to highlight at the top of your layout.',
          'Ensure each pinned repository README contains: Problem, Approach, Result, and Learnings.'
        ],
        integration: {
          platform: 'GitHub Pinned Repos',
          steps: [
            'Go to github.com/[username].',
            'Click "Customize your pins" at top-right of your pinned grid.',
            'Select your top 3 niche projects.',
            'Write an optimized README.md for each pinned repo using the Problem-Approach-Result formula.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'portfolio_first_case_study',
        title: 'Write one project case study in PAR format',
        why: 'Recruiters don\'t just look at code; they want to see your analytical decision-making flow under pressure.',
        steps: [
          'Select a recent project that solved a concrete engineering problem.',
          'Structure a text file using headings: Problem, Approach, Result, Learnings.',
          'Focus heavily on quantitative results (e.g. "reduced bundle size by 32%").'
        ],
        integration: {
          platform: 'Case Study Document',
          steps: [
            'Create a markdown file `case-study-1.md` inside your portfolio repository.',
            'Draft your PAR breakdown. Use bold elements for key metrics.',
            'Add the link to your portfolio home directory.'
          ]
        },
        impact: 2.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '5-6': [
      {
        id: 'portfolio_external_devto',
        title: 'Submit one niche case study to an external publication',
        why: 'External verification amplifies your professional signal by piggybacking on established domain authorities.',
        steps: [
          'Write a detailed technical article or case study (800+ words).',
          'Format the article inside Dev.to, Hashnode, or HackerNoon.',
          'Submit the post to a relevant domain-specific publication tag.',
          'Share the approved publication link on your LinkedIn profile.'
        ],
        integration: {
          platform: 'Dev.to / Hashnode Publication',
          steps: [
            'Go to dev.to → Create Account → Create Post.',
            'Write a case study on an engineering obstacle you solved: "How I built [System] to bypass [Bottleneck] using [Stack]."',
            'Add tags: #javascript, #webdev, #architecture.',
            'Publish and pin it in your LinkedIn Featured card.'
          ]
        },
        impact: 2.5,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '7-8': [
      {
        id: 'portfolio_interactive_portal',
        title: 'Build and deploy a custom interactive portfolio site',
        why: 'A custom, fast loading portfolio portal makes a stunning first impression and acts as a central proof container.',
        steps: [
          'Code a clean, fast-loading, responsive static HTML/CSS portfolio site.',
          'Integrate sections for Niche statement, Pinned Case Studies, Active Github repositories, and contact info.',
          'Deploy it to a free CDN host like GitHub Pages, Vercel, or Netlify under a custom domain.'
        ],
        integration: {
          platform: 'Vercel / GitHub Pages',
          steps: [
            'Create a static site repo in Git.',
            'Design a gorgeous dark-theme interface listing your top projects with quick preview cards.',
            'Link to Vercel/GitHub Pages for automatic building on commit. Add a custom domain for extra polish.'
          ]
        },
        impact: 2,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'portfolio_open_source_lib',
        title: 'Release a reusable open-source library or utility package',
        why: 'Publishing active open-source packages shows you build at production standard and understand package distribution cycles.',
        steps: [
          'Package a common technical utility or custom UI widget into a reusable library (e.g. npm package or python module).',
          'Write comprehensive unit tests and automated CI/CD configurations.',
          'Publish to public package registries and write a beautiful usage documentation README.'
        ],
        integration: {
          platform: 'GitHub & NPM Registry',
          steps: [
            'Set up a repository with complete TypeScript/JavaScript configurations.',
            'Add GitHub Actions to automatically run tests and publish to NPM on tags.',
            'Share your NPM package link in LinkedIn groups and target community feeds.'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  aitools: {
    '0-2': [
      {
        id: 'aitools_notebooklm_audit',
        title: 'Open NotebookLM and execute a Resume Gap Audit',
        why: 'Leverage AI gap analysis to see exactly how recruiter algorithms parse your resume against active JDs.',
        steps: [
          'Go to notebooklm.google.com.',
          'Create a new notebook and upload your current resume PDF.',
          'Upload 3 high-quality job postings for your target role.',
          'Input this prompt: "Compare my resume against these target roles. List the top 5 missing skills or keywords that would trigger recruiter filter rejections."'
        ],
        integration: {
          platform: 'NotebookLM Sandbox',
          steps: [
            'Go to notebooklm.google.com → New Notebook.',
            'Upload your PDF resume + copy/paste 3 job descriptions into source documents.',
            'Ask: "Audit my profile. Which specific terms do I lack?" Save the generated gap report to your local Roadmap file.'
          ]
        },
        impact: 4,
        effort: 'Quick (< 30 min)'
      }
    ],
    '3-4': [
      {
        id: 'aitools_perplexity_research',
        title: 'Use Perplexity.ai for real-time market rate audit',
        why: 'Negotiating compensation without real-time market data puts you at an immediate disadvantage in offer dialogues.',
        steps: [
          'Navigate to perplexity.ai.',
          'Search: "What are the active compensation bands and equity metrics for [Role] in [Location] as of 2026?"',
          'Analyze the output to determine your exact target floor and ceiling rates.'
        ],
        integration: {
          platform: 'Perplexity.ai Web Interface',
          steps: [
            'Go to perplexity.ai.',
            'Input: "Query the current salary distribution for [Niche Role] in [Location] for 2026. Highlight the difference in base rate for candidate portfolios showing high AI fluency vs those who don\'t."',
            'Document the figures for your Salary Calculator step.'
          ]
        },
        impact: 3,
        effort: 'Quick (< 30 min)'
      },
      {
        id: 'aitools_studio_prep',
        title: 'Configure a Google AI Studio system prompt for interview prep',
        why: 'AI Studio provides zero-latency access to Gemini models with direct system prompt settings for hyper-realistic mock interviews.',
        steps: [
          'Open google.ai.studio in your browser.',
          'Select Gemini 1.5 Pro or newer model.',
          'In the System Instruction panel, input a role-playing prompt mapping a target hiring manager persona.',
          'Initiate a chat session to practice technical mock screening.'
        ],
        integration: {
          platform: 'Google AI Studio',
          steps: [
            'Go to aistudio.google.com → Create a New Chat Prompt.',
            'Input System Instruction: "Act as an Engineering Director at [Company]. Ask me tough niche questions. Grade my responses with technical critiques."',
            'Conduct a 15-minute dialogue. Copy and analyze lessons learned.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '5-6': [
      {
        id: 'aitools_antigravity_flow',
        title: 'Explore Google Antigravity for automated tasks',
        why: 'Mastering next-generation autonomous workflows makes you a high-efficiency candidate who can automate core roles.',
        steps: [
          'Review the current documentation for Google Antigravity or equivalent browser agent.',
          'Configure an agent to audit weekly LinkedIn search appearances or competitor positioning metrics.',
          'Integrate the output into your tracking roadmap.'
        ],
        integration: {
          platform: 'Antigravity / Web Agent Dashboard',
          steps: [
            'Configure an agent to search and compile top-performing posts inside your niche once a week.',
            'Extract hook formulas and content structures to streamline your content creation calendar.'
          ]
        },
        impact: 2.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '7-8': [
      {
        id: 'aitools_custom_pipeline',
        title: 'Sync salary and target company searches to Notion using AI',
        why: 'Automating the collection of industry listings and target contacts into organized dashboards keeps your search organized.',
        steps: [
          'Build a Zapier or Make.com automation path connecting your Perplexity query outputs to a Notion database.',
          'Verify that contact emails and company data are correctly segmented.',
          'Utilize AI assistants to clean and format the incoming data weekly.'
        ],
        integration: {
          platform: 'Notion & Zapier',
          steps: [
            'Configure a Zap connecting Perplexity/AI Studio output webhooks to Notion database rows.',
            'Map parameters like Company Name, Key Contact Name, and Niche Status.',
            'Enable automatic Slack or Email notifications when a new contact is synced.'
          ]
        },
        impact: 2,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'aitools_multi_agent_pipeline',
        title: 'Deploy an autonomous multi-agent recruiter tracker',
        why: 'An automated pipeline that monitors and identifies hiring updates across 50 company dashboards gives you 3x speed advantages.',
        steps: [
          'Write a Python/Node script utilizing LangChain or AutoGen to spider target job boards.',
          'Configure semantic vector search tools to match listings against your niche keywords.',
          'Enable direct auto-notifications containing tailored outreach scripts when a matching target is found.'
        ],
        integration: {
          platform: 'Autonomous Script System',
          steps: [
            'Create a script mapping LangChain search modules to a weekly cron schedule.',
            'Integrate email services using automated scripts.',
            'Deploy this script on a local server or free cloud instance (e.g. Render/Railway).'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  content: {
    '0-2': [
      {
        id: 'content_learning_post',
        title: 'Write a public learning post today',
        why: 'Documenting your growth trajectory establishes trust and showcases practical troubleshooting abilities.',
        steps: [
          'Identify one technical obstacle you solved or a tool configuration you mastered this week.',
          'Draft: "Here\'s a problem I encountered: [Problem]. Here\'s how I researched and fixed it: [Approach]."',
          'Add a simple tagline explaining your learning process, and publish.'
        ],
        integration: {
          platform: 'LinkedIn Content Editor',
          steps: [
            'Open LinkedIn post box.',
            'Use template: "I was struggling with [Error Code] today. The standard manuals didn\'t resolve it. Here is the exact parameter tweak I made to bypass it..."',
            'Include a relevant screenshot showing code or configuration blocks. Click post.'
          ]
        },
        impact: 3.5,
        effort: 'Quick (< 30 min)'
      },
      {
        id: 'content_studio_drafts',
        title: 'Generate 12 content ideas using Google AI Studio',
        why: 'Batch-producing post structures ensures you never hit writer\'s block during your weekly publishing cycle.',
        steps: [
          'Open AI Studio and prompt it for content outline generation.',
          'Define your professional niche, focus topic, and target audience.',
          'Export the 12 generated outline hooks and file them in a local content calendar.'
        ],
        integration: {
          platform: 'AI Studio & Local Calendar',
          steps: [
            'Prompt: "Provide 12 LinkedIn post outline concepts with hooks and key bullet structures focused on [Niche Topic] for [Audience Persona]."',
            'Select the best 8 drafts and flesh them out with personal project details.',
            'Queue them up inside your monthly post tracker.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'content_niche_audit',
        title: 'Audit your last 10 posts for niche alignment',
        why: 'Scattered publishing confuses readers and dilutes search relevance. Consistency builds deep organic signal.',
        steps: [
          'Gather links to your last 10 published posts.',
          'Evaluate each post: Is it directly relevant to your defined core niche keyword? (Yes or No).',
          'Archive or delete any off-topic posts, and align all future topics to your niche.'
        ],
        integration: {
          platform: 'LinkedIn Post History',
          steps: [
            'Open your profile activity feed.',
            'Review your recent commentaries. If more than 3 are random or generic, draft 4 high-quality replacement niche posts this week.',
            'Delete the non-niche entries to clean up your public landing page.'
          ]
        },
        impact: 2.5,
        effort: 'Quick (< 30 min)'
      },
      {
        id: 'content_longform_first',
        title: 'Write and publish your first long-form article',
        why: 'Long-form pieces prove depth of expertise and act as great reference materials for recruiters.',
        steps: [
          'Select a central technical system or design pattern inside your niche.',
          'Draft an 800+ word article detailing its architecture, pitfalls, and target optimizations.',
          'Publish the article on Medium, Hashnode, or Dev.to under your domain profile.'
        ],
        integration: {
          platform: 'Medium / Hashnode',
          steps: [
            'Create a publication draft on Medium or Hashnode.',
            'Write: "The Architectural Core of [Niche System] - Optimizations and Pitfalls."',
            'Publish and add the link directly to your LinkedIn Bio Featured section.'
          ]
        },
        impact: 3,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '5-6': [
      {
        id: 'content_repurpose_high',
        title: 'Repurpose high-performing posts into detailed guides',
        why: 'Maximize content leverage. Convert popular hooks into comprehensive step-by-step documentation.',
        steps: [
          'Locate your most successful post from the last 60 days.',
          'Expand the brief hooks into a thorough technical guide with documentation.',
          'Post the expanded version as a long-form article or PDF carousel.'
        ],
        integration: {
          platform: 'LinkedIn PDF Carousel',
          steps: [
            'Convert your high-performing article into a multi-slide PDF document (e.g. using Canva).',
            'Ensure each slide has 1 key point with clear visual diagrams.',
            'Upload the PDF to a new LinkedIn post to generate an interactive sliding carousel.'
          ]
        },
        impact: 2.5,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'content_weekly_newsletter',
        title: 'Start a weekly niche newsletter on LinkedIn',
        why: 'LinkedIn Newsletter subscribers receive direct email alerts on each publication, compounding reach.',
        steps: [
          'Activate the newsletter feature inside Creator Mode.',
          'Establish a catchy title (e.g., "[Niche] Scaling Secrets") and upload a premium thumbnail.',
          'Commit to publishing exactly one 500-word niche editorial every Tuesday morning.'
        ],
        integration: {
          platform: 'LinkedIn Newsletter Interface',
          steps: [
            'Go to Article Creator → Create Newsletter.',
            'Set title, logo, and subtitle description.',
            'Draft your first edition and send invitation alerts to all your connections.'
          ]
        },
        impact: 3,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '7-8': [
      {
        id: 'content_cross_syndication',
        title: 'Establish a cross-platform content syndication engine',
        why: 'Broaden your organic reach by distributing your articles across LinkedIn, Hashnode, Dev.to, and Twitter/X simultaneously.',
        steps: [
          'Write your weekly long-form technical article.',
          'Import it to Dev.to and Hashnode using canonical links to protect original SEO ranking.',
          'Post short hook summaries on Twitter/X and LinkedIn directing readers to the main article.'
        ],
        integration: {
          platform: 'Cross-platform Channels',
          steps: [
            'Publish originally on your custom portfolio site.',
            'Syndicate to dev.to and hashnode using canonical URL setting matching your site link.',
            'Create a 5-post thread on Twitter/X outlining the article\'s core takeaways.'
          ]
        },
        impact: 2,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'content_lead_magnet',
        title: 'Author and distribute a premium digital lead magnet',
        why: 'A high-value free resource (e.g., a PDF playbook or boilerplate repo) converts casual profile views into direct inbox warm leads.',
        steps: [
          'Author a highly useful 15-page playbook or compile an optimized code template package solving a common niche bottleneck.',
          'Design a gorgeous digital cover.',
          'Publish it publicly and offer direct access to anyone who connects and drops a comment on your featured post.'
        ],
        integration: {
          platform: 'GitHub & Gumroad / PDF Carousel',
          steps: [
            'Upload your boilerplate template repo to GitHub as public.',
            'Create a PDF overview booklet explaining how to deploy the boilerplate in 5 minutes.',
            'Share on LinkedIn: "Drop a comment below and I\'ll DM you the link to the full deployment boilerplate repo today."'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  network: {
    '0-2': [
      {
        id: 'network_inner_circle_list',
        title: 'Name and audit your Inner Circle of advocates',
        why: 'True referral leverage is built on trust equity. High connection counts without trust are useless.',
        steps: [
          'Write down the names of 5-10 professional contacts who would advocate for you unprompted.',
          'Note down the last time you had a meaningful conversation or exchange with each.',
          'Select the top 2 contacts who have gone cold, and commit to delivering value to them this week.'
        ],
        integration: {
          platform: 'Network Depth Spreadsheet',
          steps: [
            'Create a spreadsheet with headers: Name, Company, Relationship (1-5), Last Contact, Value Delivered.',
            'Identify 5 past colleagues or mentors.',
            'Reach out with a short, value-first message: "Saw this article on [Niche] and thought of our work on [Project]..."'
          ]
        },
        impact: 3.5,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'network_sequence_first',
        title: 'Initiate the five-step LinkedIn sequence with 1 target contact',
        why: 'Direct cold pitching fails 98% of the time. The 5-step value sequence warms up connections systematically.',
        steps: [
          'Identify 1 strategic contact inside a target company (e.g. a senior engineer in your niche).',
          'Follow their profile and engage with their last 2 posts using substantive comments (3+ sentences).',
          'Send a connection request referencing their shared insights without asking for a job referral.'
        ],
        integration: {
          platform: 'LinkedIn Connections',
          steps: [
            'Find target employee. Click Follow.',
            'Comment on post: "Your take on [Topic] is interesting. We solved a similar issue by..."',
            'Wait 2 days. Send connection invite with note: "Hi [Name], loved your recent post on [Topic]. Let\'s connect! No sales pitch, just peer learning."'
          ]
        },
        impact: 3.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'network_depth_map',
        title: 'Map and log your relationships in the Network Map',
        why: 'An organized dashboard prevents key referral pipelines from going cold due to neglect.',
        steps: [
          'Expand your contact spreadsheet into a relationship matrix.',
          'Log contacts across 3 tiers: Inner Circle (5 advocates), Middle Circle (20 warm), Outer Circle (50 cold/new).',
          'Create automatic calendar reminders to check in with each Tier 1 contact every 30 days.'
        ],
        integration: {
          platform: 'Notion Database / Sheets',
          steps: [
            'Create a Notion database with custom relationship tags and date trackers.',
            'Input your primary 25 warm contacts.',
            'Set automated alerts: "Check in with [Name] - last active 35 days ago."'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'network_value_message',
        title: 'Send a zero-ask value resource to 3 warm contacts',
        why: 'Relational equity must be funded before withdrawal. Provide value with absolutely no hidden strings.',
        steps: [
          'Find a top-tier industry case study, checklist, or article relevant to your contacts\' domains.',
          'Draft a concise, warm message: "Hey [Name], thought this report on [Topic] would be useful for your current sprint. No reply needed!"',
          'Send the resource and ask for nothing in return.'
        ],
        integration: {
          platform: 'LinkedIn Direct Messages',
          steps: [
            'Select 3 Tier 1 contacts from your database.',
            'Send direct message with a link to a high-quality PDF guide or repository.',
            'Close with: "Just thought this was cool. Hope the week is going well!"'
          ]
        },
        impact: 2.5,
        effort: 'Quick (< 30 min)'
      }
    ],
    '5-6': [
      {
        id: 'network_middle_circle',
        title: 'Select and warm up 5 middle circle contacts',
        why: 'Expanding your list of active warm contacts increases the odds of tapping into incoming hidden job referrals.',
        steps: [
          'Choose 5 Outer Circle connections who hold strategic roles at your target companies.',
          'Engage consistently with their content over a 2-week period.',
          'Move them into the Middle Circle by initiating direct, value-first message dialogues.'
        ],
        integration: {
          platform: 'LinkedIn Engagement Feed',
          steps: [
            'Bookmark profile activity links of the 5 target contacts.',
            'Check daily for new posts and add valuable, detailed commentary.',
            'Initiate DM dialogues once they reply to your comments.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'network_peer_intro',
        title: 'Facilitate a strategic connection between two peers',
        why: 'Making meaningful introductions establishes you as an active hub in your professional network.',
        steps: [
          'Identify 2 contacts in your network who would benefit from knowing each other (e.g. a designer and a developer).',
          'Request permission from both to introduce them.',
          'Send a joint email or LinkedIn group message outlining the mutual benefits of their connection.'
        ],
        integration: {
          platform: 'Email / LinkedIn Thread',
          steps: [
            'Draft intro message: "Hi [Name1] and [Name2], wanted to connect you both. [Name1] is working on [X], [Name2] recently scaled [Y]. I think you\'d have a blast discussing... Over to you!"',
            'Send the message and step back.'
          ]
        },
        impact: 2.5,
        effort: 'Quick (< 30 min)'
      }
    ],
    '7-8': [
      {
        id: 'network_influencer_exchange',
        title: 'Establish value cycles with 15 key industry influencers',
        why: 'Developing warm relations with niche industry figures expands your reach by leveraging their established audiences.',
        steps: [
          'Identify 15 mid-tier influencers (5k-20k followers) in your niche.',
          'Become a regular contributor on their feeds by adding technical insights to their popular threads.',
          'Collaborate on a joint post or share a deep-dive case analysis referencing their insights.'
        ],
        integration: {
          platform: 'LinkedIn Community Circles',
          steps: [
            'Create an influencer watchlist folder in your browser bookmark bar.',
            'Leave valuable, thought-provoking answers on their top posts twice a week.',
            'DM them with private praise regarding their latest publication to establish peer trust.'
          ]
        },
        impact: 2,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'network_mastermind_group',
        title: 'Form and coordinate a monthly domain mastermind group',
        why: 'Leading a group of peer domain experts cements your authority and positions you at the absolute top of referral loops.',
        steps: [
          'Select 5 top-performing peers in your niche who are highly active.',
          'Invite them to a recurring 60-minute monthly discussion circle focused on advanced troubleshooting and industry trends.',
          'Coordinate the sessions and share summarized takeaways with the wider community.'
        ],
        integration: {
          platform: 'Google Meet / Zoom & Slack',
          steps: [
            'Send invitations for "Niche Mastermind Circle #1".',
            'Set the agenda: 10 mins wins, 40 mins troubleshooting bottleneck, 10 mins action items.',
            'Create a private Slack channel or group chat to maintain momentum between sessions.'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  hidden: {
    '0-2': [
      {
        id: 'hidden_target_list',
        title: 'Define your Top 10 target companies',
        why: 'Inbound campaigns require clear boundaries. Spraying-and-praying job applications is a failing tactic.',
        steps: [
          'Identify 10 high-growth target employers whose scale matches your niche credentials.',
          'Research the core engineering stack, hiring history, and organizational structure of each.',
          'Create a target sheet to track internal relationship paths.'
        ],
        integration: {
          platform: 'Target Employer Dashboard',
          steps: [
            'List 10 companies on a spreadsheet.',
            'Add specific logic notes: Why this company? (e.g. growing engineering team, remote-first, specific stack).',
            'Map 1 direct employee contact inside each target.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'hidden_warm_paths',
        title: 'Map a warm path to 3 target companies',
        why: 'Finding a referral inside your target company bypasses the standard ATS resume review process.',
        steps: [
          'Search your LinkedIn network for mutual connections inside your top 3 target companies.',
          'If a mutual connection exists, draft a friendly message requesting an introduction.',
          'If no warm path exists, utilize the 5-step sequence with active employees.'
        ],
        integration: {
          platform: 'LinkedIn Relationship Search',
          steps: [
            'Search company → Click Employees → Filter by "2nd-degree connections".',
            'Identify 3 employee targets.',
            'Reach out to your mutual 1st-degree connection: "Hey [Name], I saw you\'re connected to [Employee] at [Company]. I\'m looking into their team\'s deployment systems. Would you be open to introducing us?"'
          ]
        },
        impact: 3.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'hidden_non_app_convo',
        title: 'Secure a non-application conversation with an insider',
        why: 'Informational conversations remove the pressure of interview screening and unlock raw insider insights.',
        steps: [
          'Reach out to a warm contact at your target company.',
          'Request a brief 15-minute virtual coffee chat to discuss their team\'s engineering workflows and scale.',
          'Explicitly state that you are not asking for a job referral; you want to learn about their operational structure.'
        ],
        integration: {
          platform: '15-Minute Coffee Chat',
          steps: [
            'Draft message: "Hey [Name], love the platform scaling work your team is doing at [Company]. I\'m researching similar microservice patterns. Would you be open to a 15-min call next week to swap notes? No job pitch promised!"',
            'Prepare 3 advanced technical questions regarding their tech stack before the call.',
            'Thank them and follow up with a useful resource post-call.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'hidden_team_growth',
        title: 'Identify growing sub-teams at your target companies',
        why: 'Applying to companies is inefficient; you want to apply directly to growing sub-teams with active pain points.',
        steps: [
          'Research your top target companies using Perplexity.ai and Google News.',
          'Search for recently funded teams, department expansions, or key executive hires.',
          'Identify the specific department heads leading these expansions.'
        ],
        integration: {
          platform: 'Market Research Logs',
          steps: [
            'Query Perplexity: "Which engineering teams at [Company] have received budget increases or expanded headcount in the last 6 months?"',
            'Log the growing team names and the direct managers leading them.',
            'Prepare custom positioning statements matching those teams\' projects.'
          ]
        },
        impact: 2.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '5-6': [
      {
        id: 'hidden_referral_active',
        title: 'Request a strategic warm referral for a target team',
        why: 'A direct employee referral places your profile at the top of the recruiter\'s inbox, bypassing ATS entirely.',
        steps: [
          'Identify a contact with whom you\'ve developed trust equity inside your target company.',
          'Confirm they have a positive perspective on your proof of work and capabilities.',
          'Politely request a direct internal referral to the hiring manager for a recently opened role.'
        ],
        integration: {
          platform: 'Referral Pipeline',
          steps: [
            'Send message: "Hi [Name], I saw your team opened a [Role] slot. Given our discussions on [Topic] and my case study on [Project], I believe I could add massive value. Would you be open to passing my profile directly to [Hiring Manager]?"',
            'Provide a one-paragraph blurb they can copy/paste directly to the manager.',
            'Include your clean portfolio and resume links.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '7-8': [
      {
        id: 'hidden_operational_context',
        title: 'Gather insider context on target team objectives',
        why: 'Entering hiring conversations with precise knowledge of the team\'s current quarterly goals makes you a low-risk candidate.',
        steps: [
          'Reach out to a mid-level manager inside your target company\'s department.',
          'Ask specific questions regarding their active quarterly KPIs or technical scaling obstacles.',
          'Utilize these insights to customize your case studies for their specific pain points.'
        ],
        integration: {
          platform: 'Team KPI Profiling',
          steps: [
            'Secure a quick call or exchange with an insider.',
            'Inquire: "What is the biggest operational challenge your team is trying to solve in Q3? Is it latency, bundle size, or API overhead?"',
            'Flesh out your portfolio READMEs to emphasize similar problems you\'ve solved.'
          ]
        },
        impact: 2,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'hidden_decision_maker_consult',
        title: 'Conduct a private consultation with a hiring decision maker',
        why: 'Positioning yourself as a peer consultant rather than a job applicant bypasses standard recruiter screens entirely.',
        steps: [
          'Identify the Director or VP of Engineering at your top target company.',
          'Draft an outreach outlining a highly specific solution to a public problem they are facing.',
          'Deliver the solution as a free, 2-page brief, and invite them to discuss.'
        ],
        integration: {
          platform: 'Peer Consultant Pitch',
          steps: [
            'Analyze target company\'s public engineering blog or open Github issues.',
            'Draft a 2-page brief: "Proposed Architecture for Bypassing [Target Company\'s Public Problem]." Send directly to the Director.',
            'Close with: "I built a boilerplate system solving this in my portfolio. Open to a 10-minute chat to walk your lead devs through it."'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  },
  thought: {
    '0-2': [
      {
        id: 'thought_perspective_def',
        title: 'Define your unique contrarian professional perspective',
        why: 'Thought leadership is not repeating industry definitions. It is taking a clear, evidence-backed position on contested domain questions.',
        steps: [
          'Identify one widely accepted corporate platitude in your niche that you believe is wrong.',
          'Complete the sentence: "Most people in my domain believe [A]. I believe [B] because my experience shows [C]."',
          'Draft an argumentative post defending this stance.'
        ],
        integration: {
          platform: 'Contrarian Statement Draft',
          steps: [
            'Write: "Why standard advice about [Topic] is actually hurting your [Outcome] in 2026."',
            'Back up your viewpoint with 2 specific metrics from projects you managed.',
            'Publish as a long-form LinkedIn post.'
          ]
        },
        impact: 2.5,
        effort: 'Medium (1–3 hrs)'
      },
      {
        id: 'thought_opinion_piece',
        title: 'Publish a detailed opinion post on a trending topic',
        why: 'Expressing a firm technical opinion signals strategic depth and commands industry attention.',
        steps: [
          'Monitor your niche news feed for a newly released design pattern or industry standard.',
          'Draft a critical analysis post outlining the pros, cons, and performance trade-offs.',
          'End the post with a strong recommendation for target teams.'
        ],
        integration: {
          platform: 'LinkedIn Opinion Feed',
          steps: [
            'Select a trending topic (e.g. standardizing on a new framework).',
            'Write: "Here\'s why the excitement about [Trend] is overblown. Under production load, it triggers..."',
            'Keep formatting readable with bullet lists and bold highlights.'
          ]
        },
        impact: 3,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '3-4': [
      {
        id: 'thought_external_sub',
        title: 'Submit one article to an external publication portal',
        why: 'External validation from recognized journals multiplies your organic reach and SEO presence.',
        steps: [
          'Identify a recognized, domain-specific publication (e.g., HackerNoon, Dev.to, a targeted Substack).',
          'Review their submission guidelines and formatting rules.',
          'Draft and submit a polished 1,000-word deep-dive technical article for review.'
        ],
        integration: {
          platform: 'HackerNoon / Tech Publication',
          steps: [
            'Sign up on HackerNoon. Go to Writer Dashboard.',
            'Draft your article: "Deep-Dive into [Niche Topic] Scaling Tactics for Enterprise Teams."',
            'Submit to editors. Once published, promote on your LinkedIn feed and pin to your Featured section.'
          ]
        },
        impact: 2.5,
        effort: 'Deep (3–7 hrs)'
      },
      {
        id: 'thought_leader_comments',
        title: 'Add valuable long-form comments on 3 thought leader posts',
        why: 'Engaging with recognized leaders on their feeds exposes your insights to their high-reach target audiences.',
        steps: [
          'Identify 3 top-tier thought leaders in your niche domain.',
          'Set alerts for their posts, and react quickly when they publish.',
          'Write detailed, constructive comments (3+ sentences) expanding their points with practical evidence.'
        ],
        integration: {
          platform: 'LinkedIn Comments',
          steps: [
            'Navigate to a leader\'s popular post. Read comments.',
            'Add: "Excellent take, [Name]. To expand on point #2, we noticed that when scaling [System] to 10k users, the latency actually spiked because... We resolved it by..."',
            'Reply politely to any peers who engage with your comment.'
          ]
        },
        impact: 2,
        effort: 'Quick (< 30 min)'
      }
    ],
    '5-6': [
      {
        id: 'thought_podcast_pitch',
        title: 'Pitch yourself for a guest feature spot on a niche podcast',
        why: 'Appearing as a guest podcast speaker builds deep trust and exposes your niche frameworks to thousands of targeted listeners.',
        steps: [
          'Locate 3 mid-tier podcasts or newsletters focusing on your industry niche.',
          'Draft a concise, 3-sentence email pitch explaining your unique contrarian angle.',
          'Provide direct links to your published long-form articles as evidence of value.'
        ],
        integration: {
          platform: 'Email Podcast Pitch',
          steps: [
            'Find host email. Draft: "Hi [Host], loved your episode with [Guest] on [Topic]. I\'m an engineer specializing in [Niche]. Given [Trending Industry Event], I\'d love to share my signature 3-step framework for [Outcome] with your listeners. Here\'s a link to my case study: [Link]. Open to a chat?"',
            'Send pitch and follow up politely in 7 days.'
          ]
        },
        impact: 2.5,
        effort: 'Medium (1–3 hrs)'
      }
    ],
    '7-8': [
      {
        id: 'thought_speaking_gig',
        title: 'Apply to speak at a local or virtual industry meetup',
        why: 'Public speaking establishes you as a primary domain educator and attracts high-quality inbound referrals.',
        steps: [
          'Search for local Meetup groups or virtual conferences in your niche.',
          'Draft a 1-page talk proposal detailing your signature method or project PAR breakdown.',
          'Submit the proposal to the organizers and prepare a highly polished slide deck.'
        ],
        integration: {
          platform: 'Meetup Organizer Outreach',
          steps: [
            'Find local niche Meetup organizers.',
            'Pitch: "Proposed Talk: Automating [Niche Workflow] in 2026. A 20-minute, pure value talk showing developers exactly how to reduce deploy friction by..."',
            'Secure slot, practice deck, and share meetup registration link on your feed.'
          ]
        },
        impact: 2,
        effort: 'Deep (3–7 hrs)'
      }
    ],
    '9-10': [
      {
        id: 'thought_white_paper',
        title: 'Author and distribute a formal industry white paper',
        why: 'Publishing a rigorous white paper adopted by organizations positions you at the absolute peak of elite thought leadership.',
        steps: [
          'Conduct a thorough research study or outline a major architectural framework in your domain.',
          'Draft a comprehensive, 10-page formal PDF white paper with metric tables and architecture diagrams.',
          'Distribute the paper to target company executives and promote it through dedicated industry channels.'
        ],
        integration: {
          platform: 'Research White Paper PDF',
          steps: [
            'Compile research data into an elegant, branded PDF document.',
            'Upload PDF directly to your portfolio and LinkedIn Featured.',
            'Send copies to strategic managers at your target companies: "Hey [Name], compiled this research on scaling [Niche] in enterprise. Thought it would aid your team\'s roadmap."'
          ]
        },
        impact: 1.5,
        effort: 'Deep (3–7 hrs)'
      }
    ]
  }
};

const dbStartTag = 'const ACTIONS_DATABASE = {';
const dbEndTag = 'let state = {';

const startIndex = content.indexOf(dbStartTag);
const endIndex = content.indexOf(dbEndTag);

if (startIndex === -1 || endIndex === -1) {
  console.error("❌ Could not find database markers in HTML!");
  process.exit(1);
}

console.log("Replacing database block...");
const partBefore = content.substring(0, startIndex);
const partAfter = content.substring(endIndex);

// Use util.inspect to cleanly serialize ACTIONS_DATABASE to perfectly escaped JavaScript source code.
const serializedDB = "const ACTIONS_DATABASE = " + util.inspect(ACTIONS_DATABASE, {
  depth: null,
  maxArrayLength: null,
  compact: false,
  breakLength: 120,
  quotes: 'single'
}) + ";";

const updatedContent = partBefore + serializedDB + "\n\n    // --- DEFAULT STATE ---\n    " + partAfter;

fs.writeFileSync(htmlPath, updatedContent, 'utf8');
console.log("✅ Database programmatically updated and formatted perfectly inside HTML file!");
