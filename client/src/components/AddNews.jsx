import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import axios from "axios";

const AddNews = ({ onAddNewNews }) => {
  const [show, setShow] = useState(false);
  const [newsTypes, setNewsTypes] = useState("Event");
  const [selectedDate, setSelectedDate] = useState();
  const [description, setDescription] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedDate) {
      axios.post(`/api/addNewsEvent/2/${description}/${selectedDate}`)
        .then((response) => {
          onAddNewNews()
        })
        .catch(err => console.log(err));
    } else {
      axios.post(`/api/addNewsNews/3/${description}`)
        .then((response) => {
          onAddNewNews()
        })
        .catch(err => console.log(err));
    }
    // for checking
    // console.log(newsTypes);
    // console.log(selectedDate);
    // console.log(description);
    setShow(false);
  };

  return (
    <>
      <Button className="mt-4 mr-2" variant="primary" onClick={handleShow}>
        Add News Item
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <h3 className="ml-2">News Item</h3>
        </Modal.Header>
        <form onSubmit={handleSubmit} validate>
          <Modal.Body>
            <Container fluid>
              <Row>
                <Col md={5}>
                  <h5>Types of News</h5>
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="newstypes"
                      name="newstypes"
                      value={newsTypes}
                      onChange={(e) => setNewsTypes(e.target.value)}
                    >
                      <FormControlLabel
                        value="Event"
                        control={<Radio />}
                        label="Event"
                      />
                      <FormControlLabel
                        value="News"
                        control={<Radio />}
                        label="News"
                      />
                    </RadioGroup>
                  </FormControl>
                </Col>{
                  newsTypes === "Event" ?
                    <>
                      <Col md={7}>
                        <TextField
                          variant='outlined'
                          label='Event Date'
                          id="date"
                          required
                          type="datetime-local"
                          defaultValue={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Col>
                    </>
                    : ""
                }
              </Row>

              <Row>
                <Col className='mt-4'>
                  {/* <h5 className="mt-4">Description</h5> */}
                  <TextField
                    label='Description'
                    fullWidth
                    multiline
                    rows={5}
                    placeholder="Type here"
                    variant="outlined"
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <div className="text-right">
            <Button
              className="m-4 px-4"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button className="mr-5 px-4" type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddNews;
