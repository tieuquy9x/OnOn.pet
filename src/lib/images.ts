/** Ảnh minh hoạ miễn phí từ Unsplash. Thay bằng ảnh thật của cửa hàng khi có. */
export const photo = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const IMG = {
  heroDog: photo("1544568100-847a948585b9", 700),
  heroCat: photo("1561948955-570b270e7c36", 700),
  aboutMain: photo("1552053831-71594a27632d", 900),
  aboutSmall: photo("1576201836106-db1758fd1c97", 600),
  whyGroom: photo("1516734212186-a967f81ad0d7", 700),
  whyCat: photo("1573865526739-10659fec78a5", 700),
  whyDog: photo("1543466835-00a7907e9de1", 700),
  appointment: photo("1514888286974-6c03e2ca1dba", 900),
  promoDog: photo("1583511655857-d19b40a7a54e", 700),
  promoCat: photo("1415369629372-26f2fe60c467", 700),
  doc1: photo("1559839734-2b71ea197ec2", 500),
  doc2: photo("1612349317150-e413f6a5b16d", 500),
  doc3: photo("1622253692010-333f2da6031d", 500),
  doc4: photo("1594824476967-48c8b964273f", 500),
  dogBall: photo("1544568100-847a948585b9"),
  dogBone: photo("1543466835-00a7907e9de1"),
  dogRope: photo("1548199973-03cce0bbc87b"),
  catMouse: photo("1561948955-570b270e7c36"),
  catWand: photo("1573865526739-10659fec78a5"),
  catScratch: photo("1514888286974-6c03e2ca1dba"),
  collar: photo("1517849845537-4d257902454a"),
  backpack: photo("1583337130417-3346a1be7dee"),
  postDog: photo("1535930749574-1399327ce78f"),
  postCat: photo("1415369629372-26f2fe60c467"),
  postPuppy: photo("1587300003388-59208cc962cb"),
};
