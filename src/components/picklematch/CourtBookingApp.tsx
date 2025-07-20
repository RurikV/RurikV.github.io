import React, { FC, useState } from 'react';
import { Collapse } from './Collapse';
import { Tip } from './Tip';
import { CroppedText } from './CroppedText';
import { SliderRange } from './SliderRange';
import './CourtBookingApp.css';

// Types for court booking data
export interface Court {
  id: string;
  name: string;
  location: string;
  games: string[];
  pricePerHour: number;
  rating: number;
  description: string;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  image: string;
  availability: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: { lat: number; lng: number };
  courts: Court[];
}

// Sample data for Tennesseen locations
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
        description:
          'Professional tennis court with high-quality surface and excellent lighting. Perfect for competitive matches and training sessions. Features modern equipment and comfortable seating area for spectators.',
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
        description:
          'State-of-the-art pickleball court designed for both beginners and advanced players. Features regulation-size court with professional-grade surface and net system.',
        amenities: ['Professional net', 'Court lines', 'Equipment rental', 'Storage'],
        coordinates: { lat: 59.4371, lng: 24.7537 },
        image: 'https://via.placeholder.com/300x200/2196F3/ffffff?text=Pickleball+Court',
        availability: ['08:00', '09:00', '12:00', '13:00', '17:00', '18:00', '20:00'],
      },
      {
        id: 'koorti-volleyball-1',
        name: 'Volleyball Arena',
        location: 'Koorti',
        games: ['volleyball'],
        pricePerHour: 30,
        rating: 4.3,
        description:
          'Indoor volleyball court with professional-grade flooring and adjustable net height. Suitable for both recreational and competitive play with excellent ventilation system.',
        amenities: ['Adjustable net', 'Professional flooring', 'Scoreboard', 'Sound system'],
        coordinates: { lat: 59.4372, lng: 24.7538 },
        image: 'https://via.placeholder.com/300x200/FF9800/ffffff?text=Volleyball+Court',
        availability: ['10:00', '11:00', '15:00', '16:00', '19:00', '20:00', '21:00'],
      },
    ],
  },
  {
    id: 'pirita',
    name: 'Pirita Sports Center',
    address: 'Pirita tee 26, Nashville, Tennessee',
    coordinates: { lat: 59.4696, lng: 24.8311 },
    courts: [
      {
        id: 'pirita-tennis-1',
        name: 'Seaside Tennis Court',
        location: 'Pirita',
        games: ['tennis'],
        pricePerHour: 28,
        rating: 4.7,
        description:
          'Beautiful tennis court located near the seaside with stunning views. Features clay surface and is perfect for outdoor tennis enthusiasts who enjoy playing in a scenic environment.',
        amenities: ['Clay surface', 'Scenic views', 'Parking', 'Refreshments'],
        coordinates: { lat: 59.4696, lng: 24.8311 },
        image: 'https://via.placeholder.com/300x200/8BC34A/ffffff?text=Seaside+Tennis',
        availability: ['07:00', '08:00', '09:00', '16:00', '17:00', '18:00', '19:00'],
      },
      {
        id: 'pirita-pickleball-1',
        name: 'Coastal Pickleball',
        location: 'Pirita',
        games: ['pickleball'],
        pricePerHour: 22,
        rating: 4.6,
        description:
          'Modern pickleball facility with ocean breeze and natural lighting. Ideal for players who want to combine sport with beautiful coastal atmosphere.',
        amenities: ['Ocean view', 'Natural lighting', 'Equipment storage', 'Bike parking'],
        coordinates: { lat: 59.4697, lng: 24.8312 },
        image: 'https://via.placeholder.com/300x200/00BCD4/ffffff?text=Coastal+Pickleball',
        availability: ['08:00', '10:00', '11:00', '14:00', '15:00', '17:00', '18:00'],
      },
      {
        id: 'pirita-multi-1',
        name: 'Multi-Sport Court',
        location: 'Pirita',
        games: ['tennis', 'pickleball', 'volleyball'],
        pricePerHour: 35,
        rating: 4.4,
        description:
          'Versatile multi-sport court that can be configured for tennis, pickleball, or volleyball. Perfect for groups wanting to try different sports or for events requiring multiple game setups.',
        amenities: ['Multi-sport setup', 'Flexible configuration', 'Group facilities', 'Event hosting'],
        coordinates: { lat: 59.4698, lng: 24.8313 },
        image: 'https://via.placeholder.com/300x200/9C27B0/ffffff?text=Multi-Sport',
        availability: ['09:00', '13:00', '14:00', '16:00', '17:00', '20:00'],
      },
    ],
  },
];

const faqData = [
  {
    question: 'How do I book a court?',
    answer:
      'Select your preferred location, choose a court, pick an available time slot, and complete the booking process. Payment is processed securely online.',
  },
  {
    question: 'What games can I play?',
    answer:
      'We offer courts for tennis, pickleball, and volleyball. Some courts are multi-sport and can accommodate different games.',
  },
  {
    question: 'Can I cancel my booking?',
    answer:
      'Yes, you can cancel your booking up to 24 hours before your scheduled time for a full refund. Cancellations within 24 hours are subject to a 50% fee.',
  },
  {
    question: 'Do you provide equipment?',
    answer:
      "Most courts offer equipment rental including rackets, balls, and nets. Check the amenities section for each court to see what's available.",
  },
  {
    question: 'Are there parking facilities?',
    answer:
      'Yes, both Koorti and Pirita locations offer free parking for players. Pirita also has bike parking available.',
  },
];

export const CourtBookingApp: FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number>(50);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [showBookingDetails, setShowBookingDetails] = useState<boolean>(false);

  // Filter courts based on selected criteria
  const filteredCourts = locations
    .filter((location) => !selectedLocation || location.id === selectedLocation)
    .flatMap((location) => location.courts)
    .filter((court) => !selectedGame || court.games.includes(selectedGame))
    .filter((court) => court.pricePerHour <= priceRange)
    .filter((court) => court.rating >= ratingFilter);

  const handleBookCourt = (court: Court) => {
    setSelectedCourt(court);
    setShowBookingDetails(true);
  };

  const handleConfirmBooking = () => {
    if (selectedCourt) {
      alert(`Booking confirmed for ${selectedCourt.name} at ${selectedCourt.location}!`);
      setShowBookingDetails(false);
      setSelectedCourt(null);
    }
  };

  return (
    <div className="court-booking-app">
      <div className="app-header">
        <h1>PickleMatch - Court Booking</h1>
        <p>Book and pay for tennis, pickleball, and volleyball courts across Tennessee</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <h2>Find Your Perfect Court</h2>

        <div className="filter-controls">
          <div className="filter-group">
            <Tip title="Choose from our premium locations in Nashville">
              <label htmlFor="location-select">Location:</label>
            </Tip>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="filter-select"
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <Tip title="Select your preferred sport">
              <label htmlFor="game-select">Game Type:</label>
            </Tip>
            <select
              id="game-select"
              value={selectedGame}
              onChange={(e) => setSelectedGame(e.target.value)}
              className="filter-select"
            >
              <option value="">All Games</option>
              <option value="tennis">Tennis</option>
              <option value="pickleball">Pickleball</option>
              <option value="volleyball">Volleyball</option>
            </select>
          </div>

          <div className="filter-group">
            <Tip title="Set your maximum budget per hour">
              <label>Max Price per Hour: €{priceRange}</label>
            </Tip>
            <SliderRange value={priceRange} onChange={setPriceRange} min={15} max={50} className="price-slider" />
          </div>

          <div className="filter-group">
            <Tip title="Filter by minimum court rating">
              <label>Minimum Rating: {ratingFilter}/5</label>
            </Tip>
            <SliderRange value={ratingFilter} onChange={setRatingFilter} min={0} max={5} className="rating-slider" />
          </div>
        </div>
      </div>

      {/* Courts Grid */}
      <div className="courts-section">
        <h2>Available Courts ({filteredCourts.length})</h2>
        <div className="courts-grid">
          {filteredCourts.map((court) => (
            <div key={court.id} className="court-card">
              <img src={court.image} alt={court.name} className="court-image" />
              <div className="court-info">
                <h3>{court.name}</h3>
                <p className="court-location">{court.location}</p>
                <div className="court-games">
                  {court.games.map((game) => (
                    <span key={game} className="game-tag">
                      {game}
                    </span>
                  ))}
                </div>
                <div className="court-rating">
                  <span className="rating">★ {court.rating}</span>
                  <span className="price">€{court.pricePerHour}/hour</span>
                </div>
                <div className="court-description">
                  <CroppedText opened={false} rows={2}>
                    {court.description}
                  </CroppedText>
                </div>
                <div className="court-amenities">
                  <strong>Amenities:</strong> {court.amenities.join(', ')}
                </div>
                <button className="book-button" onClick={() => handleBookCourt(court)}>
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Google Maps Placeholder */}
      <div className="map-section">
        <h2>Court Locations</h2>
        <div className="map-placeholder">
          <div className="map-info">
            <h3>Interactive Map</h3>
            <p>View all court locations on Google Maps</p>
            <div className="location-markers">
              {locations.map((location) => (
                <div key={location.id} className="location-marker">
                  <strong>{location.name}</strong>
                  <p>{location.address}</p>
                  <p>{location.courts.length} courts available</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <Collapse opened={expandedFaq === index}>
              <div className="faq-content">
                <button className="faq-question" onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}>
                  {faq.question}
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </Collapse>
          </div>
        ))}
      </div>

      {/* Booking Details Modal */}
      {showBookingDetails && selectedCourt && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <h3>Book {selectedCourt.name}</h3>
            <div className="booking-details">
              <p>
                <strong>Location:</strong> {selectedCourt.location}
              </p>
              <p>
                <strong>Price:</strong> €{selectedCourt.pricePerHour}/hour
              </p>
              <p>
                <strong>Games:</strong> {selectedCourt.games.join(', ')}
              </p>

              <div className="time-selection">
                <h4>Available Times:</h4>
                <div className="time-slots">
                  {selectedCourt.availability.map((time) => (
                    <button key={time} className="time-slot">
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <Collapse opened={true}>
                <div className="full-description">
                  <h4>Court Description:</h4>
                  <CroppedText opened={true} rows={5}>
                    {selectedCourt.description}
                  </CroppedText>
                </div>
              </Collapse>
            </div>

            <div className="booking-actions">
              <button className="confirm-booking-button" onClick={handleConfirmBooking}>
                Confirm Booking
              </button>
              <button className="cancel-booking-button" onClick={() => setShowBookingDetails(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
