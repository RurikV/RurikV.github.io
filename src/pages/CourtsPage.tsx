import React, { FC, useState } from 'react';
import { styled } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Court, Location } from '../components/picklematch/CourtBookingApp';
import { Collapse } from '../components/picklematch/Collapse';
import { Tip } from '../components/picklematch/Tip';
import { CroppedText } from '../components/picklematch/CroppedText';
import { SliderRange } from '../components/picklematch/SliderRange';
import { useAppSelector } from '../store/hooks';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const PageTitle = styled.h1`
  color: ${(props) => props.theme.colorTextPrimary};
  margin-bottom: 20px;
  text-align: center;
`;

const FiltersSection = styled.div`
  background: ${(props) => props.theme.colorBgSecondary};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
`;

const FilterControls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FilterSelect = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.colorBorder};
  background: ${(props) => props.theme.colorBgPrimary};
  color: ${(props) => props.theme.colorTextPrimary};
`;

const CourtsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CourtCard = styled.div`
  background: ${(props) => props.theme.colorBgSecondary};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${(props) => props.theme.shadow};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CourtImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CourtInfo = styled.div`
  padding: 20px;
`;

const CourtName = styled.h3`
  color: ${(props) => props.theme.colorTextPrimary};
  margin-bottom: 8px;
`;

const CourtLocation = styled.p`
  color: ${(props) => props.theme.colorTextSecondary};
  margin-bottom: 12px;
`;

const GameTags = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
`;

const GameTag = styled.span`
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

const CourtRating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const BookButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const AdminSection = styled.div`
  background: ${(props) => props.theme.colorBgSecondary};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  border: 2px solid #28a745;
`;

const AdminButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const AdminButton = styled.button`
  padding: 10px 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #218838;
  }
`;

const EditButton = styled.button`
  padding: 6px 12px;
  background: #ffc107;
  color: #212529;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #e0a800;
  }
`;

const ModalOverlay = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: ${(props) => props.theme.colorBgPrimary};
  border-radius: 12px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.colorTextPrimary};
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px;
  background: ${(props) => props.theme.colorPrimary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: ${(props) => props.theme.colorBgSecondary};
  color: ${(props) => props.theme.colorTextPrimary};
  border: 1px solid ${(props) => props.theme.colorBorder};
  border-radius: 8px;
  cursor: pointer;
`;

const TimeSlots = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
  margin-top: 12px;
`;

const TimeSlot = styled.button`
  padding: 8px 12px;
  background: ${(props) => props.theme.colorBgSecondary};
  border: 1px solid ${(props) => props.theme.colorBorder};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => props.theme.colorPrimary};
    color: white;
  }
`;

// Sample data (extracted from CourtBookingApp)
const locations: Location[] = [
  {
    id: 'koorti',
    name: 'Koorti Sports Complex',
    address: 'Koorti tee 1, Nashville, Tennessee',
    coordinates: { lat: 59.437, lng: 24.7536 },
    courts: [
      {
        id: 'koorti-tennis-1',
        name: 'Tennis Court A',
        location: 'Koorti',
        games: ['tennis'],
        pricePerHour: 25,
        rating: 4.5,
        description: 'Professional tennis court with high-quality surface and excellent lighting.',
        amenities: ['Lighting', 'Seating', 'Equipment rental', 'Changing rooms'],
        coordinates: { lat: 59.437, lng: 24.7536 },
        image: 'https://via.placeholder.com/300x200/4CAF50/ffffff?text=Tennis+Court',
        availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00'],
      },
      {
        id: 'koorti-pickleball-1',
        name: 'Pickleball Court Premium',
        location: 'Koorti',
        games: ['pickleball'],
        pricePerHour: 20,
        rating: 4.8,
        description: 'State-of-the-art pickleball court designed for both beginners and advanced players.',
        amenities: ['Professional net', 'Court lines', 'Equipment rental', 'Storage'],
        coordinates: { lat: 59.4371, lng: 24.7537 },
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Pickleball+Court',
        availability: ['08:00', '09:00', '12:00', '13:00', '17:00', '18:00', '20:00'],
      },
    ],
  },
];

const CourtsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(50);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminModalType, setAdminModalType] = useState<'add-court' | 'edit-court' | 'add-location' | 'add-game' | null>(
    null
  );

  // Get current user's admin status
  const { profile } = useAppSelector((state) => state.auth);
  const isAdmin = profile?.role === 'admin';

  // Check if modal should be open based on URL
  React.useEffect(() => {
    const modalParam = searchParams.get('modal');
    const courtId = searchParams.get('courtId');

    if (modalParam === 'edit' && courtId) {
      const court = locations.flatMap((location) => location.courts).find((court) => court.id === courtId);

      if (court) {
        setSelectedCourt(court);
        setShowModal(true);
      }
    } else {
      setShowModal(false);
      setSelectedCourt(null);
    }
  }, [searchParams]);

  // Filter courts based on selected criteria
  const filteredCourts = locations
    .filter((location) => !selectedLocation || location.id === selectedLocation)
    .flatMap((location) => location.courts)
    .filter((court) => !selectedGame || court.games.includes(selectedGame))
    .filter((court) => court.pricePerHour <= priceRange)
    .filter((court) => court.rating >= ratingFilter);

  const handleBookCourt = (court: Court) => {
    setSelectedCourt(court);
    setSearchParams({ modal: 'edit', courtId: court.id });
  };

  const handleCloseModal = () => {
    setSearchParams({});
  };

  const handleConfirmBooking = () => {
    if (selectedCourt) {
      console.log('[DEBUG_LOG] Booking confirmed for:', selectedCourt.name);
      alert(`Booking confirmed for ${selectedCourt.name}!`);
      handleCloseModal();
    }
  };

  // Admin functionality handlers
  const handleOpenAdminModal = (type: 'add-court' | 'edit-court' | 'add-location' | 'add-game') => {
    setAdminModalType(type);
    setShowAdminModal(true);
  };

  const handleCloseAdminModal = () => {
    setShowAdminModal(false);
    setAdminModalType(null);
  };

  const handleAdminAction = () => {
    console.log('[DEBUG_LOG] Admin action:', adminModalType);
    alert(`Admin action: ${adminModalType} - This would save to backend`);
    handleCloseAdminModal();
  };

  return (
    <PageContainer>
      <PageTitle>Courts & Booking</PageTitle>

      {/* Admin Section - Only visible to admins */}
      {isAdmin && (
        <AdminSection>
          <h2>🔧 Admin Panel</h2>
          <p>Manage courts, locations, and games</p>
          <AdminButtons>
            <AdminButton onClick={() => handleOpenAdminModal('add-court')}>Add New Court</AdminButton>
            <AdminButton onClick={() => handleOpenAdminModal('add-location')}>Add New Location</AdminButton>
            <AdminButton onClick={() => handleOpenAdminModal('add-game')}>Add New Game Type</AdminButton>
          </AdminButtons>
        </AdminSection>
      )}

      <FiltersSection>
        <h2>Find Your Perfect Court</h2>
        <FilterControls>
          <FilterGroup>
            <Tip title="Choose from our premium locations">
              <label htmlFor="location-select">Location:</label>
            </Tip>
            <FilterSelect
              id="location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <Tip title="Select your preferred sport">
              <label htmlFor="game-select">Game Type:</label>
            </Tip>
            <FilterSelect id="game-select" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
              <option value="">All Games</option>
              <option value="tennis">Tennis</option>
              <option value="pickleball">Pickleball</option>
              <option value="volleyball">Volleyball</option>
            </FilterSelect>
          </FilterGroup>

          <FilterGroup>
            <Tip title="Set your maximum budget per hour">
              <label>Max Price per Hour: €{priceRange}</label>
            </Tip>
            <SliderRange value={priceRange} onChange={setPriceRange} min={15} max={50} />
          </FilterGroup>

          <FilterGroup>
            <Tip title="Filter by minimum court rating">
              <label>Minimum Rating: {ratingFilter}/5</label>
            </Tip>
            <SliderRange value={ratingFilter} onChange={setRatingFilter} min={0} max={5} />
          </FilterGroup>
        </FilterControls>
      </FiltersSection>

      <div>
        <h2>Available Courts ({filteredCourts.length})</h2>
        <CourtsGrid>
          {filteredCourts.map((court) => (
            <CourtCard key={court.id}>
              <CourtImage src={court.image} alt={court.name} />
              <CourtInfo>
                <CourtName>
                  {court.name}
                  {isAdmin && <EditButton onClick={() => handleOpenAdminModal('edit-court')}>Edit Court</EditButton>}
                </CourtName>
                <CourtLocation>{court.location}</CourtLocation>
                <GameTags>
                  {court.games.map((game) => (
                    <GameTag key={game}>{game}</GameTag>
                  ))}
                </GameTags>
                <CourtRating>
                  <span>★ {court.rating}</span>
                  <span>€{court.pricePerHour}/hour</span>
                </CourtRating>
                <div style={{ marginBottom: '12px' }}>
                  <CroppedText opened={false} rows={2}>
                    {court.description}
                  </CroppedText>
                </div>
                <BookButton onClick={() => handleBookCourt(court)}>Book Now</BookButton>
              </CourtInfo>
            </CourtCard>
          ))}
        </CourtsGrid>
      </div>

      {/* Booking Modal */}
      <ModalOverlay isVisible={showModal} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          {selectedCourt && (
            <>
              <ModalTitle>Book {selectedCourt.name}</ModalTitle>
              <div>
                <p>
                  <strong>Location:</strong> {selectedCourt.location}
                </p>
                <p>
                  <strong>Price:</strong> €{selectedCourt.pricePerHour}/hour
                </p>
                <p>
                  <strong>Games:</strong> {selectedCourt.games.join(', ')}
                </p>

                <div style={{ marginTop: '20px' }}>
                  <h4>Available Times:</h4>
                  <TimeSlots>
                    {selectedCourt.availability.map((time) => (
                      <TimeSlot key={time}>{time}</TimeSlot>
                    ))}
                  </TimeSlots>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <Collapse opened={true}>
                    <div>
                      <h4>Court Description:</h4>
                      <CroppedText opened={true} rows={5}>
                        {selectedCourt.description}
                      </CroppedText>
                    </div>
                  </Collapse>
                </div>
              </div>

              <ModalActions>
                <ConfirmButton onClick={handleConfirmBooking}>Confirm Booking</ConfirmButton>
                <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
              </ModalActions>
            </>
          )}
        </ModalContent>
      </ModalOverlay>

      {/* Admin Modal - Only accessible to admins */}
      <ModalOverlay isVisible={showAdminModal} onClick={handleCloseAdminModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>
            {adminModalType === 'add-court' && '🏟️ Add New Court'}
            {adminModalType === 'edit-court' && '✏️ Edit Court'}
            {adminModalType === 'add-location' && '📍 Add New Location'}
            {adminModalType === 'add-game' && '🎮 Add New Game Type'}
          </ModalTitle>
          <p>
            {adminModalType === 'add-court' && 'Create a new court with all necessary details.'}
            {adminModalType === 'edit-court' && 'Modify the selected court information.'}
            {adminModalType === 'add-location' && 'Add a new location where courts can be placed.'}
            {adminModalType === 'add-game' && 'Add a new game type that can be played on courts.'}
          </p>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '16px' }}>
            This is a demo modal. In a real application, this would contain forms to manage courts, locations, and
            games.
          </p>
          <ModalActions>
            <button
              onClick={handleCloseAdminModal}
              style={{
                padding: '10px 20px',
                background: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleAdminAction}
              style={{
                padding: '10px 20px',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Save Changes
            </button>
          </ModalActions>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default CourtsPage;
