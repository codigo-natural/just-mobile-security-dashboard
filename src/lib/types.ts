export interface Company {
  id: number;
  name: string;
}

export interface Assessment {
  status: string;
  id: string;
  name: string | null;
  company: Company;
  company_id?: number;
}

export interface ServiceInfo {
  id: number;
  name: string;
}

export interface AppIcon {
  url: string;
  name: string;
  extname: string;
  size: number;
  mimeType: string;
}

export interface AppData {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  version: string | null;
  icon: AppIcon;
}

export interface Scan {
  id: string;
  aat_version: string;
  scan_status: string;
  created_at: string;
  updated_at: string;
  type: string;
  app_id: string;
  assessment_service_id: number;
  app: AppData;
}

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  human: string;
}

export interface FileSummary {
  name: string;
  size: string;
}

export interface ServiceSummary {
  appId: string;
  name: string;
  description: string;
  platform: string;
  version: string;
  createdAt: string;
  finishedAt: string;
  statusId: number;
  status: string;
  duration: Duration;
  file: FileSummary;
  icon: string;
  start_date: string;
  end_date: string;
}

export interface Translation {
  description: string;
  remediation: string;
  impact: string;
  language: string;
}

export interface Ref {
  label: string;
  url: string;
}

export interface OwaspRef {
  masvs: string;
  maswe: string;
}

export interface Evidence {
  id: string;
  value: string;
  vulnerability_id: string;
  vulnerability_evidence_types_id: number;
  file_path: string;
  file_line: number[];
  extra: string | null;
  file: string | null;
  created_at: string;
  is_false_positive: boolean;
  isFalsePositive: boolean;
}

export interface Vulnerability {
  vulnerabilityId: string;
  title: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  translations: Translation[];
  refs: Ref[];
  owaspRef: OwaspRef;
  evidences: Evidence[];
  status: string;
  scanner_id: number;
}

export interface SeverityDistribution {
  high: number;
  info: number;
  medium: number;
  low: number;
}

export interface SeverityCount {
  high: number;
  medium: number;
  info: number;
  low: number;
}

export interface Properties {
  MIN_SDK: number | string;
  MD5: string;
  SHA1: string;
  SHA256: string;
  VERSION: string | number;
  ANDROID_VERSION_CODE?: string;
  FRAMEWORK: string;
  MAIN_ACTIVITY: string;
  BINARY_PROTECTIONS: null;
  ARCH?: string;
  BITS?: number;
  COMPILER?: string;
  CRYPTO?: boolean;
  LANG?: string;
  LIBRARIES?: string[];
}

export interface Component {
  name: string;
  type: string;
  is_browseable: boolean;
  is_exported: boolean;
}

export interface Protector {
  name: string;
  files: string[];
}

export interface Protection {
  type: string;
  name: string;
  category: string[];
  protectors: Protector[];
}

export interface Service {
  id: number;
  status: string;
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
  platform: "ANDROID" | "IOS";
  services: ServiceInfo;
  assessment: Assessment;
  scans: Scan[];
  summary?: ServiceSummary;
  vulnerabilities?: Vulnerability[];
  severityDistribution?: SeverityDistribution;
  severityCount?: SeverityCount;
  properties?: Properties;
  permissions?: string[];
  components?: Component[];
  protections?: Protection[];
}

export interface Data {
  services: Service[];
}