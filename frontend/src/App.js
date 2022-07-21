import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import { Container, Row, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5051';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  // const RCSB_URL =
  //   'https://cdn.rcsb.org/images/structures/tq/7tqz/7tqz_chain-A.jpeg';

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
      } catch (error) {
        console.log(error);
      }
    }
    getSavedImages();
  }, []);

  console.log(images);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('sending fetch request');

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      // console.log('getting image from RCSB');
      // const res = await axios.get(`${RCSB_URL}`);
      // console.log(res.data);
      console.log('adding found image to the state');
      setImages([{ ...res.data, title: word }, ...images]);
    } catch (error) {
      console.log(error);
    }

    console.log('clearing search form');
    setWord('');
  };

  const handleDeleteImage = async (id) => {
    id.preventDefault();
    console.log('sending delete request');
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        <Row xs={1} md={2} lg={3}>
          {images.map((image, i) => (
            <Col key={i} className="pb-3">
              <ImageCard
                image={image}
                deleteImage={handleDeleteImage}
                saveImage={handleSaveImage}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default App;
