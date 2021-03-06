import {
  SimpleFsStorageProvider,
  MatrixClient,
  AutojoinRoomsMixin,
} from "matrix-bot-sdk";

const accessToken = "YOUR ACCESS TOKEN HERE"

// file storage
const storage = new SimpleFsStorageProvider("bot.json");

// matrix client
const client = new MatrixClient("https://matrix.org", accessToken, storage);

// client automatically accepts invite for rooms
AutojoinRoomsMixin.setupOnClient(client);

// start client
client.start().then(() => console.log("Matrix client started!"));

client.on("room.message", handleCommand);

async function handleCommand(roomId: string, event: any): Promise<void> {
  if (!event.content) return;
  const sender: string = event.sender;
  const body: string = event.content.body;
  console.log(`${roomId}: ${sender} => ${body}`);

  if (body.startsWith("!bot"))
    await client.replyNotice(roomId, event, "This is the reply from bot.");
}
