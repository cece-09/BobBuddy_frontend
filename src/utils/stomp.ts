import * as StompJs from "@stomp/stompjs"

let client: StompJs.Client

export const getStompClient = (): StompJs.Client => {
  if (client) {
    return client
  }
  const prefix = `[STOMP]`

  client = new StompJs.Client({
    brokerURL: `${process.env.NEXT_PUBLIC_SERVER_URI}/ws`,
    connectHeaders: {},
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  })
  client.onConnect = frame => {
    console.log(`${prefix} connected: ${JSON.stringify(frame)}`)
  }
  client.onDisconnect = frame => {
    console.log(`${prefix} disconnected: ${JSON.stringify(frame)}`)
  }
  client.onWebSocketClose = frame => {
    console.log(`${prefix} webSocketClosed: ${JSON.stringify(frame)}`)
  }
  client.onStompError = frame => {
    console.error(`${prefix} error: ${JSON.stringify(frame)}`)
  }

  client.activate()
  return client
}

export const jsonifyStompMessage = <T>(message: StompJs.IMessage): T => {
  const data: T | undefined = JSON.parse(message.body)
  if (data === undefined) {
    throw new Error(`Cannot jsonify stomp message`)
  }
  return data
}
