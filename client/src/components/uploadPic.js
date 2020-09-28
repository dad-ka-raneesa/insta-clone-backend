const uploadImage = async (image) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'insta-clone');
  data.append('cloud_name', 'dpyrkn5yy');
  const res = await fetch('https://api.cloudinary.com/v1_1/dpyrkn5yy/image/upload', {
    method: 'POST',
    body: data
  });
  return await res.json();
}

export default uploadImage;