import { Readable } from "stream";

function bufferToStream(buffer: any) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

export default bufferToStream
  