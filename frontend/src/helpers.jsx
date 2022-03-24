export function getUserFromUserId(state, user_id) {

    let result;

    state.users.forEach(user => {

        if (user.id === user_id ){

            result = user;
        }
    })

    return result;
};

export function getLocationFromLocationId(state, location_id) {

    let result;

    state.locations.forEach(location => {

        if (location.id === location_id) {

            result = location;

        }
    })

    return result;

}

export function getReviewsFromUserId(state, user_id) {

    let result = [];

    state.user_reviews.forEach(review => {

        if(review.user_id === user_id) {

            result.push(review);
        }

    });

    return result;

};

export function getReviewsFromLocationId(state, location_id) {

    let result = [];

    state.comments.forEach(comment => {

        if (comment.location_id === location_id) {

            result.push(comment);
        }
    });

    return result;

};