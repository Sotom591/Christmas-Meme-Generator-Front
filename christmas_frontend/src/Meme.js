//meme js class info
class Meme {
  constructor(id, name, input1, input2) {
    this.id = id,
    this.name = name,
    this.input1 = input1,
    this.input2 = input2

  Meme.all.push(this)
}

Meme.all = []
