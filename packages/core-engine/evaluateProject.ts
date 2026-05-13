export type ProjectInput = {
  landscape?: { actors?: unknown[] };
  leverage?: { hasBottleneck?: boolean };
  loop?: { hasBeforeAfter?: boolean };
  learn?: { hasRules?: boolean };
  impact?: { revenue?: boolean };
  workflowDefined?: boolean;
  clarity?: boolean;
  userInteraction?: boolean;
};

export function evaluateProject(data: ProjectInput) {
  const { landscape, leverage, loop, learn } = data;

  const fourL = {
    landscapeScore: scoreLandscape(landscape),
    leverageScore: scoreLeverage(leverage),
    loopScore: scoreLoop(loop),
    learnScore: scoreLearn(learn),
  };

  const eoct = {
    E: calculateEconomic(data),
    O: calculateOperational(data),
    C: calculateCognitive(data),
    T: calculateTransactional(data),
  };

  return { fourL, eoct };
}

function scoreLandscape(l?: { actors?: unknown[] }) {
  return (l?.actors?.length ?? 0) > 2 ? 80 : 40;
}

function scoreLeverage(l?: { hasBottleneck?: boolean }) {
  return l?.hasBottleneck ? 90 : 50;
}

function scoreLoop(l?: { hasBeforeAfter?: boolean }) {
  return l?.hasBeforeAfter ? 85 : 45;
}

function scoreLearn(l?: { hasRules?: boolean }) {
  return l?.hasRules ? 95 : 50;
}

function calculateEconomic(d: ProjectInput) {
  return d.impact?.revenue ? 80 : 40;
}

function calculateOperational(d: ProjectInput) {
  return d.workflowDefined ? 85 : 45;
}

function calculateCognitive(d: ProjectInput) {
  return d.clarity ? 90 : 50;
}

function calculateTransactional(d: ProjectInput) {
  return d.userInteraction ? 80 : 40;
}
