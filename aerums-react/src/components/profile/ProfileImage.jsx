import "./Profile.css";

function ProfileImage({ image, onImageChange }) {
  return (
    <div className="profileImageContainer">
      <label>
        <img src={image} alt="profileImage" className="profileImage" />
        <input
          type="file"
          id="profileImage"
          name="myfile"
          style={{ display: "none" }}
          onChange={onImageChange}
        />
      </label>
    </div>
  );
}

export default ProfileImage;
