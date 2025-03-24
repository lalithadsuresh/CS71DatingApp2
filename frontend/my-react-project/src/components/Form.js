import React, { useState } from 'react';


const Form = () => {
  const [bio, setBio] = useState('');
  const [bioWords, setBioWords] = useState(0);
  const maxBioWords = 200;
  return (
    <div className="container py-5">
      <form>
        <h2 className="mb-5">Personal Information</h2>

        <div className="form-group mb-4">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="age">Age</label>
          <input type="number" className="form-control" id="age" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="pronouns">Pronouns</label>
          <input type="text" className="form-control" id="pronouns" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="genderIdentity">Gender Identity</label>
          <input type="text" className="form-control" id="genderIdentity" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="datePreference">Who do you want to date? (Gender)</label>
          <input type="text" className="form-control" id="datePreference" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="relationshipType">Relationship Type</label>
          <select className="form-control" id="relationshipType">
            <option>Life Partner</option>
            <option>Long-term Relationship</option>
            <option>Short-term Relationship</option>
            <option>Unsure</option>
            <option>Prefer not to say</option>
          </select>
        </div>

        <div className="form-group mb-4">
          <label htmlFor="ethnicity">Ethnicity</label>
          <input type="text" className="form-control" id="ethnicity" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="religion">Religion</label>
          <input type="text" className="form-control" id="religion" />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="bio">Short Bio</label>
          <textarea
            className="form-control"
            id="bio"
            rows="4"
            value={bio}
            onChange={(e) => {
              const text = e.target.value;
              const words = text.trim().split(/\s+/);
              if (words.length <= maxBioWords) {
                setBio(text);
                setBioWords(words.filter(Boolean).length);
              }
            }}
          />
          <small className="form-text text-muted">
            {bioWords} / {maxBioWords} words
          </small>
        </div>


        <div className="form-group mb-4">
          <label htmlFor="education">Education</label>
          <input type="text" className="form-control" id="education" />
        </div>

        <div className="form-group mb-5">
          <label htmlFor="job">Job</label>
          <input type="text" className="form-control" id="job" />
        </div>

        {/* <h4 className="mt-5 mb-4">Questions</h4> */}

        {/* {[
          "What are your hobbies?",
          "What are your dealbreakers?",
          "What is your best joke?",
          "Given the choice of anyone in the world, who would you want as a dinner guest?",
          "What would be a “perfect” day for you?",
          "What would your final meal be?",
          "What are you most grateful for in your life?",
          "What is your greatest accomplishment?",
          "What do you value most in a friendship?",
          "What is your most treasured memory?",
          "What is your most terrible memory?",
          "What is your love language?",
          "Think about the last time you cried, what was the reason?",
          "What, if anything, is too serious to be joked about?",
          "Favorite travel destination?",
          "Which country/city do you want to visit next?",
        ].map((question, idx) => (
          <div className="form-group mb-5" key={idx}>
            <label htmlFor={`question-${idx}`}>{question}</label>
            <textarea className="form-control" id={`question-${idx}`} rows="2" />
          </div>
        ))} */}

        <button type="submit" className="btn btn-primary mt-4">Submit</button>
      </form>
    </div>
  );
};

export default Form;
