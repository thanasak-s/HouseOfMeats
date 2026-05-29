// Products Data for House of Meats
// Easily add, modify, or delete items from this list to update the website.

export interface Product {
  id: string;
  nameEn: string;
  nameTh: string;
  weight: string;
  priceEn: string;
  priceTh: string;
  descriptionEn: string;
  descriptionTh: string;
  image: string; // Image path served from public/picture directory
  lineMessageUrlEn: string; // URL-encoded LINE message link (English)
  lineMessageUrlTh: string; // URL-encoded LINE message link (Thai)
  facebookUrl?: string; // Optional direct Facebook post or photo link
  isFeatured?: boolean; // Highlight premium items
}

export const PRODUCTS: Product[] = [
  {
    id: 'salmon',
    nameEn: 'Premium Atlantic Salmon',
    nameTh: 'แซลมอนแอตแลนติก พรีเมียม',
    weight: '160–260g',
    priceEn: 'Market Price',
    priceTh: 'ราคาตลาด',
    descriptionEn: 'Fresh premium Atlantic salmon portions. Cleaned, bone-out, and vacuum-sealed. Perfect for grilling, air-frying, or healthy meal preparation.',
    descriptionTh: 'แซลมอนแอตแลนติกสดเกรดพรีเมียม หั่นชิ้นหนา ถอดก้าง ซีลสูญญากาศสะอาด เหมาะสำหรับย่าง อบ หม้อทอดไร้น้ำมัน หรือทำอาหารสุขภาพ',
    image: '/picture/salmon.jpg',
    lineMessageUrlEn: 'https://line.me/R/oaMessage/%40001fnqvs/?' + encodeURIComponent('Hi, I am interested in ordering Salmon (160–260g). Please check availability.'),
    lineMessageUrlTh: 'https://line.me/R/oaMessage/%40001fnqvs/?' + encodeURIComponent('สวัสดีครับ/ค่ะ สนใจสั่งซื้อแซลมอนแอตแลนติก (160–260g) รบกวนเช็คสินค้าให้หน่อยครับ/ค่ะ'),
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590052253481',
    isFeatured: false,
  },
  {
    id: 'au-wagyu-striploin',
    nameEn: 'Australian Wagyu Striploin',
    nameTh: 'เนื้อวากิวออสเตรเลีย สตริปลอยน์',
    weight: '240–260g',
    priceEn: '339 THB',
    priceTh: '339 บาท',
    descriptionEn: 'Premium Australian Wagyu Striploin with excellent marbling (MB 2+), tenderness, and rich beefy flavor. The perfect gourmet steak cut.',
    descriptionTh: 'เนื้อสตริปลอยน์วากิวออสเตรเลียพรีเมียม ลายหินอ่อนสวยงาม (MB 2+) สัมผัสนุ่ม รสชาติเนื้อเข้มข้นกลมกล่อม เหมาะสำหรับทำสเต็กชั้นเลิศ',
    image: '/picture/AU_Striploin.jpg',
    lineMessageUrlEn: 'https://line.me/R/oaMessage/%40001fnqvs/?' + encodeURIComponent('Hi, I am interested in ordering Australian Wagyu Striploin (240–260g).'),
    lineMessageUrlTh: 'https://line.me/R/oaMessage/%40001fnqvs/?' + encodeURIComponent('สวัสดีครับ/ค่ะ สนใจสั่งซื้อเนื้อวากิวออสเตรเลีย สตริปลอยน์ (240–260g) ครับ/ค่ะ'),
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590052253481',
    isFeatured: false,
  },
  {
    id: 'jp-wagyu-ribeye',
    nameEn: 'Japanese Wagyu A5 Ribeye',
    nameTh: 'เนื้อวากิวญี่ปุ่น A5 ริบอาย',
    weight: '260–290g',
    priceEn: '599 THB',
    priceTh: '599 บาท',
    descriptionEn: 'Luxury Japanese Kuroge Washu Wagyu Ribeye. Melt-in-your-mouth marbling, unmatched tenderness, and a rich, buttery sweet aroma.',
    descriptionTh: 'เนื้อริบอายวากิวขนดำญี่ปุ่นเกรด A5 ลายหินอ่อนแทรกละเอียดละลายในปาก สัมผัสนุ่มละมุนที่สุด พร้อมกลิ่นหอมเนยหวานเป็นเอกลักษณ์',
    image: '/picture/JP_Ribeye.jpg',
    lineMessageUrlEn: 'https://line.me/R/oaMessage/%40001fnqvs/?' + encodeURIComponent('Hi, I am interested in ordering Japanese Wagyu A5 Ribeye (260–290g).'),
    lineMessageUrlTh: 'https://line.me/R/oaMessage/%40001fnqvs/?' + encodeURIComponent('สวัสดีครับ/ค่ะ สนใจสั่งซื้อเนื้อวากิวญี่ปุ่น A5 ริบอาย (260–290g) ครับ/ค่ะ'),
    facebookUrl: 'https://www.facebook.com/profile.php?id=61590052253481',
    isFeatured: true,
  },
];
