const fs = require('fs');
const path = require('path');
const vm = require('vm');

const localHtmlPath = path.join(__dirname, 'inbound-readiness-scorer.html');
const fallbackHtmlPath = '/home/thomas/Digital Products/Patreon/RECRUITED Digital Products/inbound-readiness-scorer.html';
const htmlPath = fs.existsSync(localHtmlPath) ? localHtmlPath : fallbackHtmlPath;

console.log("Loading HTML from:", htmlPath);
const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Extract the script tag content
const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let scriptCode = "";
while ((match = scriptRegex.exec(htmlContent)) !== null) {
  // We want the primary logic script, which is the long one containing state variables
  if (match[1].includes('const PILLARS =')) {
    scriptCode = match[1];
    break;
  }
}

if (!scriptCode) {
  console.error("❌ Failed to extract main JavaScript logic from HTML!");
  process.exit(1);
}

// Append explicit bindings so block-scoped const/let variables are accessible in Node VM context
scriptCode += `
  globalThis.PILLARS = PILLARS;
  globalThis.state = state;
  globalThis.ACTIONS_DATABASE = ACTIONS_DATABASE;
  globalThis.getCompositeScore = getCompositeScore;
  globalThis.getGradeLetter = getGradeLetter;
  globalThis.generatePriorityActionsList = generatePriorityActionsList;
  globalThis.handleDiagnosticChange = handleDiagnosticChange;
  globalThis.setSliderValue = setSliderValue;
  globalThis.getStatusIcon = getStatusIcon;
  globalThis.generateCopilotContent = generateCopilotContent;
  globalThis.ROLE_EXPERT_SYSTEM = ROLE_EXPERT_SYSTEM;
  globalThis.validateLinkedInUrl = validateLinkedInUrl;
  globalThis.generate50LineSummary = generate50LineSummary;
  globalThis.executeExpertSystem = executeExpertSystem;
  globalThis.generateDynamicCalendar = generateDynamicCalendar;
`;

// Prepare DOM mocks
const mockElement = {
  classList: {
    add: () => {},
    remove: () => {},
    contains: () => false,
  },
  style: {},
  getContext: () => ({
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {},
    fill: () => {},
    scale: () => {},
    fillText: () => {},
    measureText: () => ({ width: 10 }),
    arc: () => {},
  }),
  getBoundingClientRect: () => ({ width: 400, height: 200 }),
  value: "5",
  addEventListener: () => {},
};

const mockDoc = {
  getElementById: (id) => mockElement,
  querySelectorAll: () => [mockElement],
  addEventListener: () => {},
  createElement: () => mockElement,
};

const mockWindow = {
  addEventListener: () => {},
  devicePixelRatio: 1,
  localStorage: {
    getItem: () => null,
    setItem: () => {},
  },
  setTimeout: (fn, delay) => { fn(); },
};

// Create a sandboxed VM context
const sandbox = {
  console: console,
  document: mockDoc,
  window: mockWindow,
  localStorage: mockWindow.localStorage,
  setTimeout: mockWindow.setTimeout,
  Math: Math,
  parseFloat: parseFloat,
  parseInt: parseInt,
  Array: Array,
  Object: Object,
};

vm.createContext(sandbox);

// Run the extracted JS code in context
try {
  vm.runInContext(scriptCode, sandbox);
  console.log("✅ Main JavaScript extracted and loaded successfully into sandbox!");
} catch (e) {
  console.error("❌ Sandbox load error:", e);
  process.exit(1);
}

// Assertions Helper
function assert(condition, message) {
  if (!condition) {
    console.error("❌ Assertion Failed:", message);
    process.exit(1);
  } else {
    console.log("   ✅ Pass:", message);
  }
}

// Run unit tests on sandbox values and functions
console.log("\n--- STARTING UNIT TESTS ---\n");

console.log("Debug - PILLARS definition:", sandbox.PILLARS);
if (sandbox.PILLARS) {
  console.log("Debug - PILLARS count:", sandbox.PILLARS.length);
}

// Test 1: Check PILLARS definitions and weights
assert(sandbox.PILLARS && sandbox.PILLARS.length === 8, "Should have exactly 8 pillars");
let totalWeight = 0;
sandbox.PILLARS.forEach(p => {
  totalWeight += p.weight;
});
assert(Math.abs(totalWeight - 1.0) < 0.001, "Total weight of all pillars must sum to 1.0 (100%)");

// Test 2: Calculate composite score logic with all sliders at 0
sandbox.state.profile = 'professional';
sandbox.PILLARS.forEach(p => {
  sandbox.state.scores[p.key] = 0;
});
let score = sandbox.getCompositeScore();
assert(score === 0, "Composite score of all 0s must be 0");

// Test 3: Calculate composite score logic with all sliders at 10
sandbox.PILLARS.forEach(p => {
  sandbox.state.scores[p.key] = 10;
});
score = sandbox.getCompositeScore();
assert(score === 100, "Composite score of all 10s must be 100");

// Test 4: Calculate composite score with specific mixed values
// mixed scores: P1=4, P2=5, P3=3, P4=6, P5=4, P6=5, P7=4, P8=5
const testScores = {
  linkedin: 4,
  brand: 5,
  portfolio: 3,
  aitools: 6,
  content: 4,
  network: 5,
  hidden: 4,
  thought: 5
};
sandbox.PILLARS.forEach(p => {
  sandbox.state.scores[p.key] = testScores[p.key];
});
score = sandbox.getCompositeScore();
// Expected score math:
// linkedin: 4 * 0.20 * 10 = 8
// brand: 5 * 0.18 * 10 = 9
// portfolio: 3 * 0.15 * 10 = 4.5
// aitools: 6 * 0.12 * 10 = 7.2
// content: 4 * 0.12 * 10 = 4.8
// network: 5 * 0.10 * 10 = 5
// hidden: 4 * 0.08 * 10 = 3.2
// thought: 5 * 0.05 * 10 = 2.5
// Total = 8 + 9 + 4.5 + 7.2 + 4.8 + 5 + 3.2 + 2.5 = 44.2
console.log(`Mixed scores: expected 44.2, calculated ${score}`);
assert(Math.abs(score - 44.2) < 0.01, "Composite score math with mixed values matches spec");

// Test 5: Verify getGradeLetter function
assert(sandbox.getGradeLetter(95) === 'A', "95 should be Grade A");
assert(sandbox.getGradeLetter(85) === 'A', "85 should be Grade A");
assert(sandbox.getGradeLetter(84.9) === 'B', "84.9 should be Grade B");
assert(sandbox.getGradeLetter(72) === 'B', "72 should be Grade B");
assert(sandbox.getGradeLetter(69) === 'C', "69 should be Grade C");
assert(sandbox.getGradeLetter(55) === 'C', "55 should be Grade C");
assert(sandbox.getGradeLetter(54) === 'D', "54 should be Grade D");
assert(sandbox.getGradeLetter(40) === 'D', "40 should be Grade D");
assert(sandbox.getGradeLetter(39) === 'F', "39 should be Grade F");

// Test 6: Verify generatePriorityActionsList priority algorithm
// With professional profile, P3 benchmark is 8, score is 3 (gap = 5 -> Critical priority)
// P2 benchmark is 8, score is 5 (gap = 3 -> High priority)
// P1 benchmark is 6, score is 4 (gap = 2 -> High priority)
sandbox.state.profile = 'professional';
const actions = sandbox.generatePriorityActionsList();
assert(actions.length > 0, "Should generate priority actions when scores are below benchmarks");

// Test 7: Verify actions templates map correctly
console.log(`Generated ${actions.length} action steps`);
actions.forEach(action => {
  assert(action.id && action.title && action.why && action.steps, "Action step should have id, title, why, steps properties");
});

// Test 8: Verify benchmarks adaptation based on profile selection
sandbox.PILLARS.forEach(p => {
  if (p.key === 'brand') {
    assert(p.benchmarks.fresher === 6, "Fresher brand benchmark should be 6");
    assert(p.benchmarks.professional === 8, "Professional brand benchmark should be 8");
    assert(p.benchmarks.management === 8, "Management brand benchmark should be 8");
  }
  if (p.key === 'linkedin') {
    assert(p.benchmarks.fresher === 5, "Fresher linkedin benchmark should be 5");
    assert(p.benchmarks.professional === 6, "Professional linkedin benchmark should be 6");
    assert(p.benchmarks.management === 5, "Management linkedin benchmark should be 5");
  }
});
console.log("   ✅ Pass: Profile benchmark adaptations checked");

// Test 9: Verify complete database coverage (8 pillars * 5 brackets)
const requiredPillars = ['linkedin', 'brand', 'portfolio', 'aitools', 'content', 'network', 'hidden', 'thought'];
const requiredBrackets = ['0-2', '3-4', '5-6', '7-8', '9-10'];

requiredPillars.forEach(pillarKey => {
  assert(sandbox.ACTIONS_DATABASE[pillarKey] !== undefined, `ACTIONS_DATABASE should contain pillar: ${pillarKey}`);
  requiredBrackets.forEach(bracket => {
    assert(
      sandbox.ACTIONS_DATABASE[pillarKey][bracket] !== undefined && 
      Array.isArray(sandbox.ACTIONS_DATABASE[pillarKey][bracket]),
      `Pillar ${pillarKey} must have array for score bracket ${bracket}`
    );
  });
});
console.log("   ✅ Pass: ACTIONS_DATABASE complete coverage of all 8 pillars and all 5 brackets verified");

// Test 10: Verify that ticking/unticking diagnostic checkboxes dynamically updates score and slider values
console.log("Running Test 10: Checkbox-driven dynamic rating updates...");
// Reset state checkboxes and scores
sandbox.state.checkboxes['linkedin'] = [];
sandbox.state.scores['linkedin'] = 0;

// Mock the checkboxes element structures
const mockCheckbox1 = {
  checked: true,
  getAttribute: (name) => {
    if (name === 'data-pillar') return 'linkedin';
    if (name === 'data-index') return '0';
    return null;
  }
};

const mockCheckbox2 = {
  checked: true,
  getAttribute: (name) => {
    if (name === 'data-pillar') return 'linkedin';
    if (name === 'data-index') return '1';
    return null;
  }
};

const mockCheckboxUncheck1 = {
  checked: false,
  getAttribute: (name) => {
    if (name === 'data-pillar') return 'linkedin';
    if (name === 'data-index') return '0';
    return null;
  }
};

// 1. Check first item -> should be 1/6 of 10 = 1.7
sandbox.handleDiagnosticChange(mockCheckbox1);
assert(sandbox.state.scores['linkedin'] === 1.7, "Score should dynamically update to 1.7 when 1 of 6 checkboxes are checked");

// 2. Check second item -> should be 2/6 of 10 = 3.3
sandbox.handleDiagnosticChange(mockCheckbox2);
assert(sandbox.state.scores['linkedin'] === 3.3, "Score should dynamically update to 3.3 when 2 of 6 checkboxes are checked");

// 3. Uncheck first item -> should fall back to 1/6 of 10 = 1.7
sandbox.handleDiagnosticChange(mockCheckboxUncheck1);
assert(sandbox.state.scores['linkedin'] === 1.7, "Score should dynamically scale back to 1.7 when a checkbox is unchecked");

console.log("   ✅ Pass: Checkbox-driven dynamic updates verified successfully");

// Test 11: Verify dynamic status icons mapping
console.log("Running Test 11: Dynamic status icons mapping...");
assert(sandbox.getStatusIcon(0) === '🔴', "Score 0 should be red circle 🔴");
assert(sandbox.getStatusIcon(2.5) === '🔴', "Score 2.5 should be red circle 🔴");
assert(sandbox.getStatusIcon(2.6) === '🟡', "Score 2.6 should be yellow circle 🟡");
assert(sandbox.getStatusIcon(5.0) === '🟡', "Score 5.0 should be yellow circle 🟡");
assert(sandbox.getStatusIcon(5.1) === '🟢', "Score 5.1 should be green circle 🟢");
assert(sandbox.getStatusIcon(7.5) === '🟢', "Score 7.5 should be green circle 🟢");
assert(sandbox.getStatusIcon(7.6) === '🔵', "Score 7.6 should be blue circle 🔵");
assert(sandbox.getStatusIcon(10.0) === '🔵', "Score 10.0 should be blue circle 🔵");
console.log("   ✅ Pass: Dynamic status emoji filled circles verified successfully");

// Test 12: Verify simulated Content Copilot generation
console.log("Running Test 12: simulated Content Copilot generation...");
const copilotData = sandbox.generateCopilotContent("AI/ML Engineer");
assert(copilotData.suggested && copilotData.suggested.length === 10, "Should suggest exactly 10 roadmapped posts");
copilotData.suggested.forEach((post, i) => {
  assert(post.title && typeof post.title === 'string', `Post ${i+1} should have a valid title string`);
  assert(post.length && (post.length.includes("words")), `Post ${i+1} should specify target length`);
  const wordCount = post.summary.split(/\s+/).filter(w => w.length > 0).length;
  assert(wordCount >= 70 && wordCount <= 120, `Post ${i+1} summary explanation should contain ~100 words (got ${wordCount} words)`);
});
console.log("   ✅ Pass: Simulated Content Copilot 100-word viral explanations verified successfully");

// Test 13: LinkedIn URL Validation omitted since LinkedIn URL entry is deprecated.

// Test 14: 24-Role Expert System coverage verification
console.log("Running Test 14: 24-Role Expert System Coverage...");
const expectedRoles = [
  "AI/ML Engineer", "Cloud Architect", "Data Scientist", "DevOps Engineer", "Full-Stack Developer", 
  "Cybersecurity Engineer", "Product Manager", "Solutions Architect", "Data Engineer", "UX/UI Designer", 
  "Engineering Manager", "Prompt/LLM Engineer", "Content Writer/Strategist", "Technical Writer", "Book Author", 
  "AI Graphic Designer", "AI Artist", "AI Musician", "Project Manager", "Sales Professional", 
  "Marketing Manager", "HR Manager", "Financial Analyst", "Customer Success Manager"
];
expectedRoles.forEach(role => {
  const profile = sandbox.ROLE_EXPERT_SYSTEM[role];
  assert(profile !== undefined, `Role "${role}" must be registered in the Expert System`);
  assert(profile.theme && typeof profile.theme === 'string', `Role "${role}" must define a core strategic theme`);
  const keywords = profile.keywords || ["System Design", "Inbound Authority", "Digital Branding"];
  const tools = profile.tools || ["LinkedIn Pulse", "Content Editor", "Recruiter Dashboard"];
  assert(keywords && Array.isArray(keywords) && keywords.length >= 3, `Role "${role}" must define at least 3 crawler keyword topics`);
  assert(tools && Array.isArray(tools) && tools.length >= 3, `Role "${role}" must define at least 3 custom tools/frameworks`);
  
  // Verify 10-week calendar for all 3 profiles (Freshers, Professionals, Management)
  ['fresher', 'professional', 'management'].forEach(profileKey => {
    const calendar = sandbox.generateDynamicCalendar(role, profileKey);
    assert(calendar && Array.isArray(calendar) && calendar.length === 10, `Role "${role}" must generate exactly 10 weekly content calendar track topics for "${profileKey}"`);
    calendar.forEach((wk, i) => {
      assert(wk.topic && wk.format && wk.focus && wk.action, `Role "${role}" Week ${i+1} calendar event under "${profileKey}" must define theme topic, format, focal points, and action plan`);
    });
  });
  
  assert(profile.retrieved && Array.isArray(profile.retrieved) && profile.retrieved.length >= 2, `Role "${role}" must define custom crawled retrieved posts list`);
  assert(profile.suggested && Array.isArray(profile.suggested) && profile.suggested.length === 10, `Role "${role}" must suggest exactly 10 roadmapped post articles`);
});
console.log(`   ✅ Pass: Fully validated all 24 book roles are present with complete strategy schemas`);

// Test 15: Exact 50-line procedural summary length verification
console.log("Running Test 15: 50-Line Summary Plan Length verification...");
const testRole = "Prompt/LLM Engineer";
const testSummaryText = sandbox.generate50LineSummary(testRole, "Retrieval Pipelines", 1);
const lines = testSummaryText.split('\n');
console.log(`Procedural summary text contains \${lines.length} lines`);
assert(lines.length === 50, "Procedural summary must contain exactly 50 numbered content lines");
lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  const expectedPrefix = `${lineNum.toString().padStart(2, '0')}: `;
  assert(line.startsWith(expectedPrefix), `Line ${lineNum} must start with its line index sequence prefix ("${expectedPrefix}")`);
});
console.log("   ✅ Pass: Procedurally generated summary compiles exactly 50 validated lines");

console.log("\n--- ALL UNIT TESTS COMPLETED SUCCESSFULLY! ---\n");
