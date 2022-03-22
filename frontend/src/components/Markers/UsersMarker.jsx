import UserSummary from './components/UserSummary'
export default function UsersMarker(props) {
  const { user } = props;

  {user.map(x => (
    <Marker 
    key={x.id} 
    position={x.coordinates}
    >
    <Popup>
      <div>
        <UserSummary />
      </div>
    </Popup>
    </Marker>
  ))}
}