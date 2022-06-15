import { PrismaClient, Prisma, ServicesCategory} from '@prisma/client'
import { communications, IChangesData } from './data/communications';
import { dictionaries } from './data/dictionaries';

const prisma = new PrismaClient();



const categoriesData: Prisma.CategoryCreateInput[] = [
  {
    id: "category-service",
    name: "Шиномонтаж",
    slug: "cat-tire-service",
    isServices: true,
  },
  {
    id: "category-tire",
    name: "Шины",
    slug: "tires",
    isProduct: true,
  },
  {
    id: "category-automotive",
    name: "Автомобильные",
    slug: "tires-automotive",
    isProduct: true,
  },
  {
    id: "category-cargo",
    name: "Грузовые",
    slug: "tires-cargo",
    isProduct: true,
  },
  {
    id: "category-motorcycle",
    name: "Мотошины",
    slug: "tires-motorcycle",
    isProduct: true,
  },
  {
    id: "category-news",
    name: "Новости",
    slug: "news"
  }

];



const usersData: Prisma.UserCreateInput[] = [
  {
    email:       "admin@admin.ru",
    password:    "12345678",
    isAdmin: true,
  }
];
const productData: Prisma.ProductCreateInput[] = [
  {
    id: "product-1",
    name:      "Cordiant Sport 3 PS2 215/65 R16 102V",
    width:     185,
    preview: "/img/products/product-1.png",
    quantity: 14,
    price: 5600.4,
    rating: 4,
    published: true,
    code: 32342324,
    comments: {
        create: 
            [
                {
                    user: {
                        create: {
                            email: "test@mail.ru",
                            password: "123345"
                        }
                    },
                    comment: "Test msg",
                }
            ]
    },
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "cordiant-sport-3"
  },
  {
    id: "product-2",
    name:      "Cordiant Snow Cross 2",
    width:     160,
    preview: "/img/products/product-1.png",
    quantity: 1,
    price: 7020,
    rating: 4,
    published: true,
    code: 22342324,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "cordiant-snow-cross-2"
  },
  {
    id: "product-4",
    name:      "Pirelli PZero",
    width:     175,
    preview: "/img/products/product-1.png",
    quantity: 1,
    price: 1200,
    rating: 5,
    published: true,
    code: 12342324,
    completeSet: true,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "pirelli-pzero"
  },
  {
    id: "product-3",
    name:      "Goodyear Vector 4Seasons SUV Gen-2",
    width:     185,
    preview: "/img/products/product-1.png",
    quantity: 22,
    price: 10000.4,
    rating: 5,
    published: true,
    code: 32342321,
    comments: {
        create: 
            [
                {
                    user: {
                        create: {
                            email: "user@mail.ru",
                            password: "2345678"
                        }
                    },
                    comment: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.`,
                },
                {
                  user: {
                      create: {
                          email: "user-2@mail.ru",
                          password: "2345678"
                      }
                  },
                  comment: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне`,
              }
            ]
    },
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "goodyear-vector-4seasons-suv-gen-2"
  },
  {
    id: "product-5",
    name:      "Петрошина Л-362 90/90 -10 42J TT",
    width:     90,
    preview: "/img/products/product-2.jpeg",
    quantity: 3,
    price: 1200,
    rating: 4,
    published: true,
    code: 13342324,
    completeSet: false,
    loadIndex: 42,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "petroshina-l-362-90-on-90"
  },
  {
    id: "product-6",
    name:      "НШЗ NR201 R19.5 245/70 136/134M TL",
    width:     245,
    preview: "/img/products/product-3.jpg",
    quantity: 28,
    price: 19000,
    rating: 4,
    published: true,
    code: 13342344,
    completeSet: false,
    loadIndex: 139,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "nsh-nr201-r19-tl"
  },
  /*--------------------------*/
  {
    id: "product-7",
    name:      "Cordiant Sport 3 PS2 102V",
    width:     185,
    preview: "/img/products/product-1.png",
    quantity: 4,
    price: 8500,
    rating: 4,
    published: true,
    code: 82236774,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "cordiant-sport-3-ps2-v120"
  },
  {
    id: "product-8",
    name:      "Cordiant Snow Cross 8",
    width:     160,
    preview: "/img/products/product-1.png",
    quantity: 1,
    price: 9999,
    rating: 4,
    published: true,
    code: 91576241,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "cordiant-snow-cross-8"
  },
  {
    id: "product-9",
    name:      "Pirelli PZero F1",
    width:     175,
    preview: "/img/products/product-1.png",
    quantity: 2,
    price: 26000,
    rating: 5,
    published: true,
    code: 12342324,
    completeSet: true,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "pirelli-pzero-f1"
  },
  {
    id: "product-10",
    name:      "Goodyear Vector 4Seasons SUV Gen-4",
    width:     185,
    preview: "/img/products/product-1.png",
    quantity: 3,
    price: 6500,
    rating: 5,
    published: true,
    code: 999348,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "goodyear-vector-4seasons-suv-gen-4"
  },
  {
    id: "product-12",
    name:      "Петрошина Л-368 80/80 -10 42J TT",
    width:     90,
    preview: "/img/products/product-2.jpeg",
    quantity: 10,
    price: 4200,
    rating: 3,
    published: true,
    code: 85087265,
    completeSet: false,
    loadIndex: 42,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "petroshina-l-368-80-on-80"
  },
  {
    id: "product-11",
    name:      "НШЗ NR201 TL",
    width:     240,
    preview: "/img/products/product-3.jpg",
    quantity: 12,
    price: 8000,
    rating: 1,
    published: true,
    code: 357764,
    completeSet: true,
    loadIndex: 139,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "nsh-nr201-tl"
  },
  {
    id: "product-13",
    name:      "НШЗ NR211 TL",
    width:     250,
    preview: "/img/products/product-3.jpg",
    quantity: 7,
    price: 5400,
    rating: 5,
    published: true,
    code: 2257764,
    completeSet: true,
    loadIndex: 139,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "nsh-nr211-tl"
  },
  {
    id: "product-14",
    name:      "Петрошина Л-368 80/80 -10 42J TJ",
    width:     90,
    preview: "/img/products/product-2.jpeg",
    quantity: 10,
    price: 8200,
    rating: 4,
    published: true,
    code: 77087265,
    completeSet: false,
    loadIndex: 42,
    users:{
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    slug: "petroshina-l-368-80-on-80-tj"
  },
];

const servicesData: Prisma.ServicesCreateInput[] =[
  {
    id: "services-1",
    title: "Шиномонтаж",
    preview: "/img/services/s1-small.png",
    published: true,
    users: {      
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    price: 500,
    workDesc: "Ежедневно с 9:00 до 21:00, без перерывов",
    slug: "sevices-1",
  },
  {
    id: "services-2",
    title: "Шиномонтаж",
    preview: "/img/services/s2-small.png",
    published: true,
    users: {      
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: false,
      }
    },
    price: 800,
    workDesc: "Ежедневно с 9:00 до 21:00, без перерывов",
    slug: "sevices-2",
  },
  {
    id: "services-3",
    title: "Сезонное хранение шин",
    preview: "/img/services/s3-small.png",
    published: true,
    users: {      
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: false,
      }
    },
    price: 0,
    workDesc: "Ежедневно с 9:00 до 21:00, без перерывов",
    slug: "sevices-3",
  }
]; 

const newsData: Prisma.NewsCreateInput[] =[
  {
    id: "news-1",
    title: "Тормозные колодки со скидкой 10%",
    preview: "/img/news/news-1.png",
    published: true,
    users: {      
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: true,
      }
    },
    comments: {
      create: 
          [
              {
                  user: {
                      create: {
                          email: "arturo@mail.ru",
                          password: "2345678"
                      }
                  },
                  comment: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.`,
              },
              {
                user: {
                    create: {
                        email: "bobboi@mail.ru",
                        password: "2345678"
                    }
                },
                comment: `Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне`,
            }
          ]
  },
    slug: "news-1",
    validUntil: new Date(2022, 12, 1),
    isStock: true
  },
  {
    id: "news-2",
    title: "Скидка 10% на датчики давления при покупке дисков!",
    preview: "/img/news/news-2.png",
    published: true,
    users: {      
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: false,
      }
    },
    slug: "news-2",
    validUntil: new Date(2022, 0, 1),
    tags: '["Диски", "Шины"]',
    isStock: true
  },
  {
    id: "news-3",
    title: `Покупайте новую АКБ со скидкой до 1500 рублей и бесплатной заменой!`,
    preview: "/img/news/news-3.png",
    published: true,
    users: {      
      create:  {
        email:       "del@del.ru",
        password:    "12345678",
        isAdmin: false,
      }
    },
    slug: "news-3",
    validUntil: new Date(2022, 5, 23),
    isStock: true
  }
]; 


async function main() {
  console.log(`Start seeding ...`)

  // Create dictionaries
  for (const key in dictionaries) {
    for (const u of dictionaries[key]) {
      if(prisma[key as never] !== undefined){
        const dictionariesItem = await (prisma[key as never] as any).create({
          data: u,
        })
        console.log(`Created dictionaries ${key} with id: ${dictionariesItem.id}`)
      } else {
        console.error(`Error dictionaries ${key}`)
      }
    } 
  }
  // END dictionaries

  for (const u of usersData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  } 

  for (const u of categoriesData) {
    const cat = await prisma.category.create({
      data: u,
    })
    console.log(`Created user with id: ${cat.id}`)
  } 

  for (const u of productData) {
    const product = await prisma.product.create({
      data: u,
    })
    console.log(`Created products with id: ${product.id}`)
  }

  for (const u of servicesData) {
    const services = await prisma.services.create({
      data: u,
    })
    console.log(`Created services with id: ${services.id}`)
  }

  for (const u of newsData) {
    const news = await prisma.news.create({
      data: u,
    })
    console.log(`Created news with id: ${news.id}`)
  }

  const admin = await prisma.user.findFirst({
    where: {email: "admin@admin.ru"},
  })


if(admin){
    const services = await prisma.services.findMany();

    for (const u of services) {
      const userRemove = u.userId;
      const service = await prisma.services.update({
        where:{
          id: u.id
        },
        data:{
          userId: admin.id
        },
        select: {
          id: true,
       }
      });
      
      await prisma.user.delete({
        where:{ id: userRemove}
      });

      console.log(`Update services with id: ${service.id}`)
    }
    const news = await prisma.news.findMany();

    for (const u of news) {
      const userRemove = u.userId;
      const newsItem = await prisma.news.update({
        where:{
          id: u.id
        },
        data:{
          userId: admin.id
        },
        select: {
          id: true,
       }
      });
      
      await prisma.user.delete({
        where:{ id: userRemove}
      });

      console.log(`Update services with id: ${newsItem.id}`)
    }

    const products = await prisma.product.findMany();
    for (const u of products) {
      const userRemove = u.userId;
      const product = await prisma.product.update({
        where:{
          id: u.id
        },
        data:{
          userId: admin.id
        },
        select: {
          id: true,
       }
      });
      
      await prisma.user.delete({
        where:{ id: userRemove}
      });

      console.log(`Update product with id: ${product.id}`)
    }

    // change refs field

    for (const u of communications.catRefServices) {
      const createRefCat = await prisma.servicesCategory.create({
       data:{
        categoryId: u.categoryId,
        serviceId: u.servicesId,
       }
      });

      console.log(`Create ref Service to Cat services with id: ${createRefCat.categoryId + "=" + createRefCat.serviceId}`)
    }

    for (const u of communications.catRefNews) {
      const createRefCat = await prisma.newsCategory.create({
       data:{
        categoryId: u.categoryId,
        newsId: u.servicesId,
       }
      });

      console.log(`Create ref News to Cat news with id: ${createRefCat.categoryId + "=" + createRefCat.newsId}`)
    }

    for (const u of communications.catRefProducts) {
      const createRefCat = await prisma.productCategory.create({
       data:{
        categoryId: u.categoryId,
        productId: u.servicesId
       }
      });

      console.log(`Create ref Product to Cat products with id: ${createRefCat.categoryId + "=" + createRefCat.productId}`)
    }

  const changes: IChangesData = communications.changes;
  for (const key in changes) {
    for(let i = 0; i < changes[key].length; i++){
        try {
          const itemData = await prisma.product.update({
            where:{
              id:changes[key][i].id
            },
            data:{
              [key]: changes[key][i].setId
            },
          });
          console.log(`Update ${key} with id: ${itemData.id}`)
        } catch (error) {
          console.error(`Error ${key}:`, error)
        }
    }

  }
    
}

  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })