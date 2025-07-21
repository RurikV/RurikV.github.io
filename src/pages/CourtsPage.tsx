import React, { FC, useState } from 'react';
import { styled } from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { Court, Location } from '../components/picklematch/CourtBookingApp';
import { Collapse } from '../components/picklematch/Collapse';
import { Tip } from '../components/picklematch/Tip';
import { CroppedText } from '../components/picklematch/CroppedText';
import { SliderRange } from '../components/picklematch/SliderRange';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { addLocation, updateLocation, addCourt, updateCourt } from '../store/slices/locationsSlice';
import { addGameType, updateGameType } from '../store/slices/gameTypesSlice';
import { CourtForm, CourtFormData } from '../components/admin/forms/CourtForm';
import { LocationForm, LocationFormData } from '../components/admin/forms/LocationForm';
import { GameTypeForm, GameTypeFormData } from '../components/admin/forms/GameTypeForm';

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

const CourtsPage: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(50);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminModalType, setAdminModalType] = useState<
    'add-court' | 'edit-court' | 'add-location' | 'edit-location' | 'add-game' | 'edit-game' | null
  >(null);

  // Get data from Redux store
  const { profile } = useAppSelector((state) => state.auth);
  const { locations } = useAppSelector((state) => state.locations);
  const { gameTypes } = useAppSelector((state) => state.gameTypes);
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
  const handleOpenAdminModal = (
    type: 'add-court' | 'edit-court' | 'add-location' | 'edit-location' | 'add-game' | 'edit-game'
  ) => {
    setAdminModalType(type);
    setShowAdminModal(true);
  };

  const handleCloseAdminModal = () => {
    setShowAdminModal(false);
    setAdminModalType(null);
  };

  // Form submission handlers
  const handleCourtSubmit = (data: CourtFormData) => {
    console.log('[DEBUG_LOG] Court form submitted:', data);

    // Find the location for this court
    const location = locations.find((loc) => loc.id === data.locationId);
    if (!location) {
      console.error('Location not found for court');
      return;
    }

    // Convert form data to Court format
    const courtData = {
      id: data.id,
      name: data.name,
      location: location.name,
      games: data.games,
      pricePerHour: data.pricePerHour,
      rating: data.rating,
      description: data.description,
      amenities: data.amenities,
      coordinates: data.coordinates,
      image: data.image,
      availability: data.availability,
    };

    if (adminModalType === 'add-court') {
      dispatch(addCourt({ locationId: data.locationId, court: courtData }));
    } else if (adminModalType === 'edit-court') {
      dispatch(updateCourt({ locationId: data.locationId, court: courtData }));
    }

    handleCloseAdminModal();
  };

  const handleLocationSubmit = (data: LocationFormData) => {
    console.log('[DEBUG_LOG] Location form submitted:', data);

    if (adminModalType === 'add-location') {
      dispatch(addLocation(data));
    } else if (adminModalType === 'edit-location') {
      dispatch(updateLocation(data));
    }

    handleCloseAdminModal();
  };

  const handleGameTypeSubmit = (data: GameTypeFormData) => {
    console.log('[DEBUG_LOG] Game type form submitted:', data);

    if (adminModalType === 'add-game') {
      dispatch(addGameType(data));
    } else if (adminModalType === 'edit-game') {
      dispatch(updateGameType(data));
    }

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
              {gameTypes.map((gameType) => (
                <option key={gameType.id} value={gameType.id}>
                  {gameType.name}
                </option>
              ))}
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
          {adminModalType === 'add-court' && (
            <CourtForm onSubmit={handleCourtSubmit} onCancel={handleCloseAdminModal} isEdit={false} />
          )}
          {adminModalType === 'edit-court' && (
            <CourtForm
              initialData={selectedCourt || undefined}
              onSubmit={handleCourtSubmit}
              onCancel={handleCloseAdminModal}
              isEdit={true}
            />
          )}
          {adminModalType === 'add-location' && (
            <LocationForm onSubmit={handleLocationSubmit} onCancel={handleCloseAdminModal} isEdit={false} />
          )}
          {adminModalType === 'edit-location' && (
            <LocationForm
              initialData={locations.find((loc) => loc.id === selectedLocation) || undefined}
              onSubmit={handleLocationSubmit}
              onCancel={handleCloseAdminModal}
              isEdit={true}
            />
          )}
          {adminModalType === 'add-game' && (
            <GameTypeForm onSubmit={handleGameTypeSubmit} onCancel={handleCloseAdminModal} isEdit={false} />
          )}
          {adminModalType === 'edit-game' && (
            <GameTypeForm
              initialData={gameTypes.find((game) => game.id === selectedGame) || undefined}
              onSubmit={handleGameTypeSubmit}
              onCancel={handleCloseAdminModal}
              isEdit={true}
            />
          )}
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default CourtsPage;
