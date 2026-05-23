import { Module } from '@/types'

export const integrationAutomationModule: Module = {
  id: 'integration-automation',
  title: 'Integration & Automation Advisor',
  tagline: 'Logic Apps vs Function Apps vs Automation Accounts — pick the right tool for the job',
  description:
    'Answer 8 questions about your automation use case, team skills, execution patterns, and integration requirements to receive a concrete recommendation across Azure Logic Apps, Azure Functions, and Azure Automation Accounts.',
  emoji: '⚡',
  questions: [
    {
      id: 'use_case',
      text: 'What is the primary purpose of this automation or integration?',
      options: [
        { value: 'business_process', label: 'Business process automation', description: 'Approval workflows, document processing, SaaS integration, business rules' },
        { value: 'it_ops', label: 'IT operations automation', description: 'VM start/stop, patching, runbooks, infrastructure maintenance, cost management' },
        { value: 'data_integration', label: 'Data integration or ETL', description: 'Moving data between systems, transforming records, syncing databases' },
        { value: 'event_processing', label: 'Event-driven processing', description: 'React to events from queues, Event Grid, Service Bus, or webhooks' },
      ],
    },
    {
      id: 'builder_skills',
      text: 'Who will build and maintain this automation?',
      options: [
        { value: 'low_code', label: 'Business analyst or low-code user', description: 'Prefers visual designer; limited coding ability → Logic Apps' },
        { value: 'developer', label: 'Developer comfortable with code', description: 'Prefers writing code over visual tools → Azure Functions' },
        { value: 'ops_engineer', label: 'Ops or DevOps engineer', description: 'Infrastructure automation, PowerShell or Python scripts → Automation Accounts' },
        { value: 'mixed', label: 'Mixed team — business and technical users', description: 'Logic Apps with custom Function connectors for complex logic' },
      ],
    },
    {
      id: 'logic_complexity',
      text: 'How complex is the logic or workflow?',
      options: [
        { value: 'simple', label: 'Simple sequential steps — trigger → action → done', description: 'Logic Apps Consumption; straightforward connector-based flows' },
        { value: 'conditional', label: 'Conditional branching, loops, error handling', description: 'Logic Apps Standard or Functions; both handle branching well' },
        { value: 'heavy_code', label: 'Complex code — algorithms, data transformation, ML inference', description: 'Azure Functions; full language support (C#, Python, JS, Java)' },
        { value: 'long_running', label: 'Long-running workflows — days, weeks, human approvals', description: 'Logic Apps (native) or Durable Functions (code-first)' },
      ],
    },
    {
      id: 'integrations',
      text: 'What systems do you need to connect to?',
      options: [
        { value: 'microsoft', label: 'Microsoft 365, Dynamics, SharePoint, Teams', description: 'Logic Apps has 400+ managed connectors including all Microsoft services' },
        { value: 'azure_services', label: 'Azure services — Service Bus, Event Grid, Storage, SQL', description: 'Both Logic Apps and Functions have native Azure bindings' },
        { value: 'saas', label: 'Third-party SaaS — Salesforce, SAP, ServiceNow, Slack', description: 'Logic Apps managed connectors cover most SaaS; Functions for custom HTTP APIs' },
        { value: 'onprem', label: 'On-premises systems via hybrid connectivity', description: 'Logic Apps on-premises data gateway; or Functions with VNet integration' },
      ],
    },
    {
      id: 'trigger_pattern',
      text: 'How is the automation triggered?',
      options: [
        { value: 'schedule', label: 'On a schedule — cron / recurring timer', description: 'All three services support scheduled triggers; Automation Accounts excel here' },
        { value: 'event', label: 'Event-driven — message queue, Event Grid, webhook', description: 'Functions and Logic Apps; Functions preferred for high-throughput event processing' },
        { value: 'http', label: 'HTTP request — REST API or webhook call', description: 'Functions (fastest cold start on Consumption); Logic Apps HTTP trigger' },
        { value: 'manual', label: 'Manual / on-demand — operator-triggered runbooks', description: 'Automation Accounts; Logic Apps with manual trigger; Functions with HTTP' },
      ],
    },
    {
      id: 'execution_duration',
      text: 'How long does each execution run?',
      options: [
        { value: 'seconds', label: 'Seconds — fast, stateless execution', description: 'Functions Consumption (5-min max); Logic Apps Consumption actions' },
        { value: 'minutes', label: 'Minutes — moderate processing time', description: 'Functions Premium or Dedicated; Logic Apps Standard; Automation runbooks' },
        { value: 'hours', label: 'Hours — long-running jobs', description: 'Automation Accounts (no timeout on runbooks); Logic Apps Standard; Durable Functions' },
        { value: 'days', label: 'Days or weeks — workflows awaiting human approval', description: 'Logic Apps (native workflow persistence); Durable Functions with eternal orchestrations' },
      ],
    },
    {
      id: 'scale',
      text: 'What are your concurrency and throughput requirements?',
      options: [
        { value: 'low', label: 'Low — a few executions per day', description: 'Any service works; optimise for cost → Consumption plans' },
        { value: 'moderate', label: 'Moderate — dozens to hundreds per hour', description: 'Functions Consumption or Logic Apps Consumption; auto-scales within limits' },
        { value: 'high', label: 'High — thousands per hour, burst traffic', description: 'Functions Premium (pre-warmed) or Dedicated plan; no cold starts' },
        { value: 'very_high', label: 'Very high — millions of events (IoT, telemetry)', description: 'Functions with Event Hubs trigger; Consumption or Premium depending on latency needs' },
      ],
    },
    {
      id: 'cost_model',
      text: 'What pricing model suits your usage pattern?',
      options: [
        { value: 'per_execution', label: 'Pay per execution — variable, low baseline cost', description: 'Functions Consumption or Logic Apps Consumption; ideal for sporadic workloads' },
        { value: 'fixed', label: 'Fixed monthly cost — predictable spend', description: 'Functions App Service Plan or Logic Apps Standard; always-on instance' },
        { value: 'automation_units', label: 'Automation Account — free 500 min/month then per-minute', description: 'Best for scheduled IT ops runbooks; very cost-effective at low volume' },
        { value: 'enterprise', label: 'Enterprise Agreement / committed use', description: 'Functions Premium with reserved instances; Logic Apps Standard with EA pricing' },
      ],
    },
  ],
}
