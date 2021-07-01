const rp = require('request-promise')

class Chevereto {
  constructor ({ host, key }) {
    if (typeof host !== 'string') {
      throw TypeError('host must be a string')
    }
    if (typeof key !== 'string') {
      throw TypeError('key must be a string')
    }
    this.host = host
    this.key = key
  }

  async upload (imageURL) {
    if (typeof imageURL !== 'string') {
      throw TypeError('imageURL must be a string')
    }
    const options = {
      method: 'POST',
      url: `https://${this.host}/api/1/upload`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        key: this.key,
        source: imageURL
      },
      json: true
    }
    try {
      const { image } = await rp(options)
      return {
        success: true,
        status: 200,
        image
      }
    } catch (e) {
      throw TypeError(JSON.stringify(e.error))
    }
  }
}

module.exports = Chevereto
