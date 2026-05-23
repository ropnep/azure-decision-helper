import { Module } from '@/types'

export const storageAccountModule: Module = {
  id: 'storage-account',
  title: 'Azure Storage Account Advisor',
  tagline: 'Right replication, right tier, right performance class for your data',
  description:
    'Answer 8 questions about your data type, access patterns, durability requirements, and compliance needs to receive a concrete Azure Storage account kind, replication, and access tier recommendation.',
  emoji: '📦',
  questions: [
    {
      id: 'data_type',
      text: 'What type of data will you store?',
      options: [
        { value: 'blob', label: 'Unstructured data — blobs, images, videos, backups', description: 'General Purpose v2 or Blob Storage account' },
        { value: 'files', label: 'File shares — SMB or NFS mounts', description: 'Azure Files in GPv2; Premium File Shares for high IOPS' },
        { value: 'data_lake', label: 'Data Lake — big data analytics (Spark, Databricks, Synapse)', description: 'Hierarchical Namespace (ADLS Gen2) on GPv2 account' },
        { value: 'mixed', label: 'Mixed — blobs, files, queues, and tables', description: 'General Purpose v2 with lifecycle management policies' },
      ],
    },
    {
      id: 'access_pattern',
      text: 'How frequently will this data be accessed?',
      description: 'Access tier affects cost significantly — Hot is optimised for frequent access, Archive for long-term retention.',
      options: [
        { value: 'hot', label: 'Frequently — daily reads and writes', description: 'Hot tier; lowest access cost, highest storage cost' },
        { value: 'cool', label: 'Infrequently — monthly access or less', description: 'Cool tier (30-day minimum); lower storage cost, higher per-read cost' },
        { value: 'cold', label: 'Rarely — accessed only a few times per year', description: 'Cold tier (90-day minimum); very low storage cost' },
        { value: 'archive', label: 'Almost never — compliance retention or long-term backup', description: 'Archive tier (180-day minimum); lowest storage cost; hours to rehydrate' },
      ],
    },
    {
      id: 'replication',
      text: 'What redundancy and durability do you need?',
      description: 'More replication = higher cost but better protection against data loss.',
      options: [
        { value: 'lrs', label: 'LRS — 3 copies within one datacenter', description: 'Lowest cost; no protection against datacenter failure; dev/test only' },
        { value: 'zrs', label: 'ZRS — 3 copies across Availability Zones', description: 'Recommended for production; protects against datacenter failure; same region' },
        { value: 'grs', label: 'GRS — LRS + async replication to secondary region', description: 'Geo-redundant; data accessible in secondary only after failover' },
        { value: 'gzrs', label: 'GZRS — ZRS + async replication to secondary region', description: 'Maximum durability; zone + geo redundant; recommended for critical data' },
      ],
    },
    {
      id: 'performance',
      text: 'What storage performance do you need?',
      options: [
        { value: 'standard', label: 'Standard — HDD-backed, general purpose', description: 'GPv2 Standard; suitable for most workloads, backups, and analytics staging' },
        { value: 'premium_blob', label: 'Premium Block Blob — low latency blob storage', description: 'SSD-backed; single-digit millisecond latency; streaming, IoT, analytics ingestion' },
        { value: 'premium_files', label: 'Premium File Shares — high IOPS NFS/SMB', description: 'SSD-backed; required for high-throughput file share workloads, databases on NFS' },
        { value: 'premium_page', label: 'Premium Page Blob — VM disk storage', description: 'Used by Azure Managed Disks; choose Premium SSD or Ultra Disk at VM level instead' },
      ],
    },
    {
      id: 'public_access',
      text: 'Who or what needs to access this storage?',
      options: [
        { value: 'public_blob', label: 'Public read access — hosting static content or public assets', description: 'Anonymous blob read; useful for static websites, public CDN origin' },
        { value: 'azure_services', label: 'Azure services only — no public internet access', description: 'Allow trusted Azure services; disable public blob access' },
        { value: 'private_endpoint', label: 'Private endpoint — VNet-only access, no public endpoint', description: 'Recommended for production; storage gets private IP in your VNet' },
        { value: 'sas_token', label: 'SAS token or Managed Identity — controlled external sharing', description: 'Time-limited or identity-based access for specific external parties' },
      ],
    },
    {
      id: 'immutability',
      text: 'Do you need immutable or WORM (Write Once Read Many) storage?',
      options: [
        { value: 'no', label: 'No — data can be modified or deleted normally', description: 'Standard access; no immutability policies' },
        { value: 'soft_delete', label: 'Soft delete only — 7–365 day recovery window', description: 'Protects against accidental deletion; data recoverable for defined period' },
        { value: 'legal_hold', label: 'Legal hold / litigation hold', description: 'Indefinite immutability until hold is explicitly released; legal and compliance use cases' },
        { value: 'worm', label: 'Time-based retention (WORM) — locked policy', description: 'Locked immutability policy; SEC 17a-4, FINRA, HIPAA compliance' },
      ],
    },
    {
      id: 'lifecycle',
      text: 'Do you need automated data lifecycle management?',
      options: [
        { value: 'none', label: 'No — data stays in same tier indefinitely', description: 'Manual management; simplest but highest cost for infrequently accessed data' },
        { value: 'tiering', label: 'Auto-tier to Cool or Cold after X days', description: 'Lifecycle policy moves blobs to cheaper tiers based on last-modified date' },
        { value: 'archive', label: 'Auto-archive after inactivity period', description: 'Move to Archive after 90–180 days; significant cost saving for old data' },
        { value: 'delete', label: 'Auto-delete after retention period', description: 'Automatically expire and delete blobs after defined number of days' },
      ],
    },
    {
      id: 'data_size',
      text: 'What is the expected storage volume?',
      options: [
        { value: 'small', label: 'Under 1 TB', description: 'Any account type; cost is minimal at this scale' },
        { value: 'medium', label: '1 TB – 100 TB', description: 'Consider ZRS or GRS replication; lifecycle management starts to matter' },
        { value: 'large', label: '100 TB – 1 PB', description: 'ADLS Gen2 for analytics; lifecycle management essential; reserved capacity worth evaluating' },
        { value: 'petascale', label: 'Petabyte-scale', description: 'ADLS Gen2 + Blob reserved capacity; contact Microsoft for large commitment discounts' },
      ],
    },
  ],
}
