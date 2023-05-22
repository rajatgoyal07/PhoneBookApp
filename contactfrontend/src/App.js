// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Paper,
  makeStyles,
  Modal,
  Fade,
  Backdrop,
} from '@material-ui/core';
import {AddCircle, ContactsRounded, Delete, Phone} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
  },
  contactTitle: {
    fontSize: '1.5rem',
    marginRight: '10px',
    marginBottom: '30px',
  },
  addButton: {
    marginLeft: theme.spacing(4),
    fontSize: '9px',
    marginBottom: '1rem',
  },
  searchBox: {
    marginBottom: theme.spacing(2),
  },
  contactList: {
    marginTop: theme.spacing(2),
  },
  contactItem: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: '1px solid #9F9F9FFF',
    borderRadius: '4px',
    backgroundColor: 'white',
    fontSize: '8px',
    height: '60px'
  },
  contactName: {
    fontWeight: 'bold',
  },
  phoneIcon: {
    height: '11px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    maxWidth: 400,
    width: '100%',
    outline: 'none',
  },
  modalTitle: {
    marginBottom: theme.spacing(2),
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalTextField: {
    marginBottom: theme.spacing(2),
  },
  modalButton: {
    marginTop: theme.spacing(2),
  },
}));

const App = () => {
  const classes = useStyles();

  const [contacts, setContacts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/contacts');
      setContacts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addContact = async () => {
    try {
      const newContact = {
        firstName,
        lastName,
        phoneNumber,
      };
      await axios.post('http://localhost:8080/api/contacts', newContact);
      fetchContacts();
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setOpenModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredContacts = contacts.filter((contact) =>
      `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <Container maxWidth="sm">
        <Paper className={classes.root}>
          <div className={classes.header}>
            <Typography variant="h5" component="h1" className={classes.contactTitle}>
              <ContactsRounded fontSize="large" />
            </Typography>
            <Typography variant="h5" component="h1" className={classes.contactTitle}>
              Phone Book App
            </Typography>
          </div>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" component="h2">
                Contacts
              </Typography>
            </Grid>
            <Grid item xs={6} container justify="flex-end">
              <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircle />}
                  className={classes.addButton}
                  onClick={() => setOpenModal(true)}
              >
                Add Contact
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12} container justify="flex-end">
              <TextField
                  label="Search Contacts"
                  fullWidth
                  className={classes.searchBox}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
          </Grid>
          <List className={classes.contactList} >
            {filteredContacts.map((contact) => (
                <ListItem key={contact.id} className={classes.contactItem}>
                  <ListItemText
                      primaryTypographyProps={{ className: classes.contactName }}
                      primary={`${contact.firstName} ${contact.lastName}`}
                      secondary={
                        <React.Fragment>
                          <Phone className={classes.phoneIcon} />
                          {contact.phoneNumber}
                        </React.Fragment>
                      }
                  />
                  <ListItemSecondaryAction >
                    <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={() => deleteContact(contact.id)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>

            ))}
          </List>
        </Paper>
        <Modal
            className={classes.modal}
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
          <Fade in={openModal}>
            <div className={classes.modalContent}>
              <Typography variant="h5" component="h2" className={classes.modalTitle}>
                Add Contact
              </Typography>
              <form className={classes.modalForm}>
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={classes.modalTextField}
                    required
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={classes.modalTextField}
                    required
                />
                <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={classes.modalTextField}
                    required
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addContact}
                    className={classes.modalButton}
                >
                  Add Contact
                </Button>
              </form>
            </div>
          </Fade>
        </Modal>
      </Container>
  );
};

export default App;
