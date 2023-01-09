import { GetObjectCommand, S3, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Readable } from 'stream'
import { format } from 'date-fns'

const s3 = new S3Client({
    region: process.env.REACT_APP_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY!
    }
})

export const uploadFile = async (file: File): Promise<string> => {

    // input要素に設定されたfileをReadableStreamに変換する
    const rs: ReadableStream<Uint8Array> = file.stream()

    const key = format(new Date(), "yyyyMMddHHmmss")

    const upload = new Upload({
        client: s3,
        params: {
            Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME!,
            Key: key,
            Body: rs,
            ACL: 'public-read'
        }
    })

    await upload.done()
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            throw err
        })

    return key
}

export const downloadFile = async (key: string) => {
    const result: Readable | void = await s3.send(new GetObjectCommand({
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: key,

    })).then((res) => {
        return res.Body as Readable
    }).catch((err) => {
        console.log(err)
    })

    if (result) {
        // const writableObj = fs.createWriteStream('ファイル名');
        // ReadableStream => ReadableObject にしたい
        // result.pipe(writableObj)
    }

}

export const getImageUrlOnAwsS3 = (key: string): string => {
    const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_NAME
    const regionName = process.env.REACT_APP_AWS_S3_REGION
    return `https://${bucketName}.s3.${regionName}.amazonaws.com/${key}`
}
