export interface BuildSettings {
    binary: string,
    outputDir: string,
    icon: string,
    entryPoint: string,
    envFile?: string;
    versionInfo: {
        CompanyName?: string
        ProductName?: string
        FileDescription?: string
        FileVersion?: string
        ProductVersion?: string
        InternalName?: string
        LegalCopyright?: string
    }
    seaConfig: {
        disableExperimentalSEAWarning?: boolean
        useSnapshot?: boolean
        useCodeCache?: boolean
        assets?: Record<string, string>
    }
}
