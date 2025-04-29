declare module "postject" {
    export interface PostjectOpts {
        machoSegmentName?: any;
        overwrite?: any;
        sentinelFuse?: any;
    }

    export async function inject(
        filename: string,
        resourceNam: string,
        resourceData: BufferSource,
        opts?: PostjectOpts
    ): Promise<void>;
}
