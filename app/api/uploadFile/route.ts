import { NextRequest, NextResponse} from "next/server";

import {
    S3Client,
    PutObjectCommand
} from "@aws-sdk/client-s3";

const Bucket = "cloudcomputingproject2025";
const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
})

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.getAll("file") as File[];

    const response = await Promise.all(
        file.map(async (file: File) => {
            const Body = (await file.arrayBuffer()) as unknown as Buffer;
            s3.send(new PutObjectCommand({Bucket, Key: file.name, Body}));
        })
    )

    return NextResponse.json(response);
}