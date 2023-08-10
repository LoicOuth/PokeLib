export interface GooglePeople {
  names: GooglePeopleName[];
  photos: GooglePeoplePhotos[];
  emailAddresses: GoogleEmailsPhotos[];
}

interface GooglePeopleName {
  metadata: {
    primary: boolean;
  };
  displayName: string;
}

interface GooglePeoplePhotos {
  url: string;
  metadata: {
    primary: boolean;
  };
}

interface GoogleEmailsPhotos {
  metadata: {
    primary: boolean;
    source: {
      id: string;
    };
  };
  value: string;
}
