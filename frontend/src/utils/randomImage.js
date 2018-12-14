export default function randomImage() {
  const imgArr = ['https://images.pexels.com/photos/533923/pexels-photo-533923.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                  'https://images.pexels.com/photos/753869/pexels-photo-753869.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                  'https://images.pexels.com/photos/417351/pexels-photo-417351.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                  'https://images.pexels.com/photos/1134835/pexels-photo-1134835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                  'https://images.pexels.com/photos/1486464/pexels-photo-1486464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                  'https://images.pexels.com/photos/1443657/pexels-photo-1443657.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
                ]
  let num = Math.floor( Math.random() * imgArr.length );
  return imgArr[num];
}
