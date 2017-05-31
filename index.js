const cheerio = require('cheerio')
const fs = require('fs')

fs.readFile('index.html', 'utf8', function (err, data) {
  if (err) throw err

  const $ = cheerio.load(data)
  const tracks = []

  $('.audio_info').each(function(i, elem) {
    const author = $(this).find('.audio_performer').text().trim()
    const title = $(this).find('.audio_title').text().trim()

    tracks[i] = `${author} - ${title}`
  })

  const finalText = tracks.join('\n')

  fs.writeFile('out.txt', finalText, function (err) {
    if (err) throw err

    console.log('Done')
  })
})
