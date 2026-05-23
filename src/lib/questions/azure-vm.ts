import { Module } from '@/types'

export const azureVmModule: Module = {
  id: 'azure-vm',
  title: 'Azure VM Advisor',
  tagline: 'Right-size your VMs and choose the correct availability, disk, and licensing model',
  description:
    'Answer 8 questions about your workload, availability requirements, and cost model to get a concrete Azure VM series recommendation, disk type, availability configuration, and cost optimisation strategy.',
  emoji: '🖥️',
  questions: [
    {
      id: 'workload_type',
      text: 'What is the primary workload running on this VM?',
      options: [
        { value: 'web', label: 'Web server / application server', description: 'IIS, Nginx, Tomcat, general-purpose workloads' },
        { value: 'database', label: 'Database server', description: 'SQL Server, Oracle, MySQL self-managed on VM' },
        { value: 'hpc', label: 'High-performance compute / batch processing', description: 'Rendering, simulation, scientific computing, AI training' },
        { value: 'dev_test', label: 'Development or test environment', description: 'Non-production; cost optimisation is the priority' },
      ],
    },
    {
      id: 'compute_requirement',
      text: 'What are your CPU and memory requirements?',
      options: [
        { value: 'small', label: 'Small — up to 4 vCPUs, up to 16 GB RAM', description: 'Light workloads, dev/test, small web apps' },
        { value: 'medium', label: 'Medium — 4–8 vCPUs, 16–32 GB RAM', description: 'Mid-size web apps, small databases' },
        { value: 'large', label: 'Large — 8–16 vCPUs, 32–128 GB RAM', description: 'Production databases, enterprise applications' },
        { value: 'xlarge', label: 'Extra large — 16+ vCPUs or 128+ GB RAM', description: 'SAP, large SQL Server, HPC workloads' },
      ],
    },
    {
      id: 'availability',
      text: 'What uptime SLA do you need for this VM?',
      description: 'Single VMs have no Microsoft SLA. Availability Zones give 99.99%.',
      options: [
        { value: 'none', label: 'No SLA required — dev/test or non-critical', description: 'Acceptable for dev, test, or batch jobs' },
        { value: 'availability_set', label: '99.95% — Availability Set', description: 'Protects against rack-level failures in same datacenter' },
        { value: 'availability_zone', label: '99.99% — Availability Zones', description: 'Protects against full datacenter failure; recommended for production' },
        { value: 'multi_region', label: 'Multi-region active-active or active-passive', description: 'Maximum resilience; geo-redundant workloads' },
      ],
    },
    {
      id: 'disk_type',
      text: 'What storage performance does your workload require?',
      options: [
        { value: 'standard_hdd', label: 'Standard HDD — low IOPS, lowest cost', description: 'Dev/test, backups, infrequently accessed data' },
        { value: 'standard_ssd', label: 'Standard SSD — moderate IOPS, better latency', description: 'Light production workloads, web servers' },
        { value: 'premium_ssd', label: 'Premium SSD — high IOPS up to 20,000', description: 'Production databases, I/O-intensive workloads' },
        { value: 'ultra_disk', label: 'Ultra Disk — sub-millisecond latency, up to 160,000 IOPS', description: 'SAP HANA, Oracle, high-throughput databases' },
      ],
    },
    {
      id: 'os',
      text: 'What operating system does your workload require?',
      options: [
        { value: 'windows', label: 'Windows Server', description: 'Consider Azure Hybrid Benefit if you have existing licences' },
        { value: 'linux', label: 'Linux (Ubuntu, RHEL, SUSE)', description: 'Lower base cost; preferred for containers and open source stacks' },
        { value: 'windows_sql', label: 'Windows + SQL Server', description: 'Both OS and SQL Server licence costs apply; AHUB can significantly reduce cost' },
        { value: 'any', label: 'No preference', description: 'Choose based on cost and performance recommendation' },
      ],
    },
    {
      id: 'commitment',
      text: 'How long will this VM run?',
      description: 'Reserved Instances give 40–72% savings over pay-as-you-go for committed workloads.',
      options: [
        { value: 'short', label: 'Short-term — less than 6 months', description: 'Pay-as-you-go or Spot is most cost-effective' },
        { value: 'one_year', label: '1 year', description: '1-year Reserved Instance — ~40% savings' },
        { value: 'three_year', label: '3 years', description: '3-year Reserved Instance — up to 72% savings' },
        { value: 'permanent', label: 'Indefinite / always-on', description: 'Reserved + Azure Hybrid Benefit for maximum savings' },
      ],
    },
    {
      id: 'backup',
      text: 'What backup and disaster recovery do you need?',
      options: [
        { value: 'none', label: 'No backup — dev/test or stateless', description: 'No data to protect; VM can be recreated' },
        { value: 'daily', label: 'Daily backup, 30-day retention', description: 'Standard Azure Backup policy; LRS vault' },
        { value: 'enterprise', label: 'Daily backup + long-term retention (1–10 years)', description: 'Compliance-driven retention; GRS vault recommended' },
        { value: 'dr', label: 'Full DR with Azure Site Recovery', description: 'RPO/RTO requirements; replicate to secondary region' },
      ],
    },
    {
      id: 'isolation',
      text: 'Do you have hardware isolation or tenancy requirements?',
      options: [
        { value: 'none', label: 'No — shared hardware is fine', description: 'Standard Azure shared infrastructure' },
        { value: 'dedicated_host', label: 'Azure Dedicated Host', description: 'Entire physical server dedicated to your organisation; compliance use cases' },
        { value: 'isolated_vm', label: 'Isolated VM series (e.g. Standard_E80ids_v4)', description: 'Single tenant on physical host; no Dedicated Host management overhead' },
        { value: 'confidential', label: 'Confidential Computing VMs (DCsv3)', description: 'Hardware-based TEE (Trusted Execution Environment); sensitive data in use' },
      ],
    },
  ],
}
