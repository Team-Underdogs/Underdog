import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const TagsBanner = () => {
    const tagGroups = {
        'Regions': ['Northland', 'Auckland', 'Waikato', 'Bay of Plenty', 'Gisborne', 'Hawkes Bay', 'Taranaki', 'Whanganui', 'Wellington', 'Tasman', 'Nelson', 'Marlborough', 'West Coast', 'Canterbury', 'Otago', 'Southland'],
        'Ethnicity': ['Maori', 'Pacific Islander', 'European', 'Asia', 'Africa', 'MENA'],
        'Identity': ['Women', 'LGBTQIA+'],
        'Religion': ['Muslim', 'Jewish', 'Sikh', 'Buddhist', 'Hindu', 'Other'],
        'Sustainability': ['Eco-Friendly', 'Vegan', 'Halal', 'Organic'],
        'Health': ['Mental Health', 'Disabilities', 'Aged'],
    };

    const [openTagGroups, setOpenTagGroups] = useState({});
    const [selectedTags, setSelectedTags] = useState({});

    // Toggles the tag grouping (e.g., Religion) being open or closed, and updates an array to say which groups are currently open
    const toggleTagGroup = (tagGroup) => {
        setOpenTagGroups((prevOpenTagGroups) => {
            const updatedOpenTagGroups = {
                ...prevOpenTagGroups,
                [tagGroup]: !prevOpenTagGroups[tagGroup],
            };
            console.log('Currently opened groups:', updatedOpenTagGroups);
            return updatedOpenTagGroups;
        });
    }; 

    const handleTagCheck = (tagGroup, tag) => {
        setSelectedTags((prevSelectedTags) => {
            const isSelected = prevSelectedTags[tagGroup] ? prevSelectedTags[tagGroup].includes(tag) : false;
    
            if (isSelected) {
                const newSelectedTags = {
                    ...prevSelectedTags,
                    [tagGroup]: prevSelectedTags[tagGroup].filter((selectedTag) => selectedTag !== tag),
                };
                console.log('Updated selectedTags:', newSelectedTags);
                return newSelectedTags;
            } else {
                const newSelectedTags = {
                    ...prevSelectedTags,
                    [tagGroup]: prevSelectedTags[tagGroup] ? [...prevSelectedTags[tagGroup], tag] : [tag],
                };
                console.log('Currently selected tags:', newSelectedTags);
                return newSelectedTags;
            }
        });
    };
    
    return (
        <div className="tags-container">
            {Object.entries(tagGroups).map(([tagGroup, tags], index) => (
                <div className="tag-group" key={index}>
                    <div className="dropdown-menu">
                        {tagGroup}
                        <div className="chevrons">
                            <FontAwesomeIcon
                                icon={openTagGroups[tagGroup] ? faChevronUp : faChevronDown}
                                style={{ color: "#000000" }}
                                onClick={() => toggleTagGroup(tagGroup)}
                            />
                        </div>
                    </div>
                    {openTagGroups[tagGroup] && (
                        <div className="tag-list">
                            {tags.map((tag, tagIndex) => (
                                <div className="tagOption" key={tagIndex}>
                                    <input
                                        type="checkbox"
                                        name={tagGroup}
                                        value={tag}
                                        checked={selectedTags[tagGroup] ? selectedTags[tagGroup].includes(tag) : false}
                                        onChange={() => handleTagCheck(tagGroup, tag)}
                                    />
                                    {tag}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};


export default TagsBanner;
