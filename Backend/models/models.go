package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// User represents the Admin account
type User struct {
	ID       primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name" bson:"name"`
	Email    string             `json:"email" bson:"email"`
	Password string             `json:"password" bson:"password"`
}

// Session represents a feedback event
type Session struct {
	ID        primitive.ObjectID `json:"id,omitempty" bson:"_id,omitempty"`
	Title     string             `json:"title" bson:"title"`
	Content   string             `json:"content" bson:"content"`       // Description
	CreatorID string             `json:"creator_id" bson:"creator_id"` // Admin ID
}

// Feedback represents a user response
type Feedback struct {
	SessionID string `json:"session_id" bson:"session_id"`
	Rating    int    `json:"rating" bson:"rating"`
	Comment   string `json:"comment" bson:"comment"`
}