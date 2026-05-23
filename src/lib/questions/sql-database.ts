import { Module } from '@/types'

export const sqlDatabaseModule: Module = {
  id: 'sql-database',
  title: 'Azure SQL Database Advisor',
  tagline: 'Single Database vs Elastic Pool vs Managed Instance — plus the right tier and HA model',
  description:
    'Answer 8 questions about your workload, data size, compatibility requirements, and availability needs to get a concrete Azure SQL deployment model, service tier, and high availability recommendation.',
  emoji: '🗄️',
  questions: [
    {
      id: 'deployment_model',
      text: 'Do you need full SQL Server compatibility or is PaaS acceptable?',
      description: 'SQL Managed Instance supports nearly all SQL Server features. SQL Database (PaaS) covers ~95% of workloads with less overhead.',
      options: [
        { value: 'paas_fine', label: 'PaaS is fine — no SQL Agent, CLR, or linked servers needed', description: 'Azure SQL Database is the right fit' },
        { value: 'some_features', label: 'Need some advanced features (SQL Agent, cross-DB queries)', description: 'Likely SQL Managed Instance; verify feature list' },
        { value: 'full_compat', label: 'Full SQL Server compatibility required', description: 'SQL Managed Instance or SQL Server on Azure VM' },
        { value: 'unsure', label: 'Unsure — migrating an existing database', description: 'Use Database Migration Assessment to check compatibility' },
      ],
    },
    {
      id: 'database_count',
      text: 'How many databases will you manage with similar resource requirements?',
      options: [
        { value: 'one', label: '1 database', description: 'Single Database; no pooling needed' },
        { value: 'few', label: '2–10 databases', description: 'Elastic Pool may save cost if usage patterns vary' },
        { value: 'many', label: '10–100 databases', description: 'Elastic Pool strongly recommended; multi-tenant SaaS pattern' },
        { value: 'hundreds', label: '100+ databases', description: 'Elastic Pool with multiple pools or Managed Instance pool' },
      ],
    },
    {
      id: 'service_tier',
      text: 'What are your compute and IOPS requirements per database?',
      options: [
        { value: 'serverless', label: 'Variable / unpredictable — auto-pause when idle', description: 'Serverless tier; scales compute automatically, pauses when not in use' },
        { value: 'general_purpose', label: 'Moderate — balanced compute and storage', description: 'General Purpose tier; 5.4 GB/vCore, remote storage, 99.99% SLA' },
        { value: 'business_critical', label: 'High IOPS / low latency / in-memory OLTP needed', description: 'Business Critical tier; local SSD, read replica included, highest performance' },
        { value: 'hyperscale', label: 'Large data volume (4 TB+) or need fast scale-out', description: 'Hyperscale tier; up to 100 TB, rapid scaling, named replicas' },
      ],
    },
    {
      id: 'ha_requirement',
      text: 'What high availability and disaster recovery do you need?',
      options: [
        { value: 'basic', label: 'Dev/test — no HA needed', description: 'Single replica; acceptable for non-production' },
        { value: 'zone_redundant', label: '99.995% — Zone-redundant HA', description: 'Replicas across Availability Zones; automatic failover within region' },
        { value: 'geo_replication', label: 'Active geo-replication to secondary region', description: 'Up to 4 readable secondaries; manual or auto failover; RPO < 5 seconds' },
        { value: 'failover_group', label: 'Auto-failover group — transparent connection string failover', description: 'Automatic failover to secondary region; no app connection string change needed' },
      ],
    },
    {
      id: 'data_size',
      text: 'What is your current or projected database size?',
      options: [
        { value: 'small', label: 'Under 100 GB', description: 'Any tier works; cost optimise with Serverless or Basic' },
        { value: 'medium', label: '100 GB – 1 TB', description: 'General Purpose or Business Critical depending on IOPS needs' },
        { value: 'large', label: '1 TB – 4 TB', description: 'General Purpose max (4 TB) or Business Critical (4 TB)' },
        { value: 'very_large', label: 'Over 4 TB', description: 'Hyperscale tier required — scales to 100 TB' },
      ],
    },
    {
      id: 'backup_retention',
      text: 'What backup retention do you require?',
      options: [
        { value: 'default', label: '7 days (default)', description: 'Standard; point-in-time restore within 7 days' },
        { value: 'extended', label: '7–35 days', description: 'Extended short-term retention; still point-in-time restore' },
        { value: 'ltr_monthly', label: 'Monthly or yearly backups (compliance)', description: 'Long-term retention (LTR) policy; up to 10 years' },
        { value: 'ltr_custom', label: 'Custom LTR — specific retention for audit/legal', description: 'LTR with custom weekly/monthly/yearly backup schedule' },
      ],
    },
    {
      id: 'connectivity',
      text: 'How will applications connect to the database?',
      options: [
        { value: 'public', label: 'Public endpoint — internet or Azure services', description: 'Simplest; secure with firewall rules and Azure AD authentication' },
        { value: 'service_endpoint', label: 'VNet service endpoint', description: 'Traffic stays on Azure backbone; no private IP for database' },
        { value: 'private_endpoint', label: 'Private endpoint (recommended for production)', description: 'Database gets a private IP in your VNet; no public exposure' },
        { value: 'mi_vnet', label: 'Managed Instance — fully VNet-injected', description: 'SQL MI is always inside your VNet; no public endpoint option without explicit enablement' },
      ],
    },
    {
      id: 'cost_model',
      text: 'What is your cost commitment model?',
      options: [
        { value: 'payg', label: 'Pay-as-you-go — no commitment', description: 'Maximum flexibility; highest per-hour rate' },
        { value: 'reserved_1yr', label: '1-year Reserved Capacity', description: 'Up to 33% savings over pay-as-you-go' },
        { value: 'reserved_3yr', label: '3-year Reserved Capacity', description: 'Up to 38% savings; best for stable, long-running databases' },
        { value: 'ahub', label: 'Azure Hybrid Benefit — existing SQL Server licence', description: 'Use existing SQL Server SA licences; up to 55% savings' },
      ],
    },
  ],
}
