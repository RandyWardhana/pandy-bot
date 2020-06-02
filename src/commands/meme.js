import Discord from 'discord.js'
import Canvas from 'canvas'

import { reply } from '../response'
import { walter } from '../util/meme-template';

const responsiveText = (canvas, text) => {
  const ctx = canvas.getContext('2d')

  let fontSize = 48

  do {
    ctx.font = `bold ${fontSize -= 4}px sans-serif`
  } while (ctx.measureText(text).width > canvas.width - 250)

  return ctx.font
}

const wrapText = (ctx, text, maxWidth) => {
  var words = text.split(" ");
  var lines = [];
  var currentLine = words[0];

  for (var i = 1; i < words.length; i++) {
      var word = words[i];
      var width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
          currentLine += " " + word;
      } else {
          lines.push(currentLine);
          currentLine = word;
      }
  }
  lines.push(currentLine);
  return lines;
}

export default {
  label: 'p:meme',
  name: 'meme',
  value: 'Meme command',
  async execute(msg, args) {
    const canvas = Canvas.createCanvas(900, 500),
      ctx = canvas.getContext('2d'),
      textString = "ARGUMEN YANG BAGUS",
      argsText = `TAPI ${args.join(' ').toUpperCase()}`,
      memeTemplate = await Canvas.loadImage(walter)

    ctx.drawImage(memeTemplate, 0, 0, canvas.width, canvas.height)

    ctx.font = 'bold 40px sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#000000'
    ctx.textAlign = 'center'

    ctx.fillText(textString, canvas.width / 2, canvas.height - 450)
    ctx.strokeText(textString, canvas.width / 2, canvas.height - 450)

    ctx.font = responsiveText(canvas, argsText)
    // ctx.font = wrapText(ctx, argsText, canvas.width)
    ctx.fillText(argsText, canvas.width / 2, canvas.height - 20)
    ctx.strokeText(argsText, canvas.width / 2, canvas.height - 20)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), walter)

    reply(msg, 'Nih pesanan agan.', attachment)
  }
}