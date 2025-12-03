package db

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Global DB variable so other packages can access it
var Client *mongo.Client
var Database *mongo.Database

func Connect() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Get the Mongo URI from environment (for Docker) or default to localhost
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	var err error
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("❌ Could not connect to MongoDB:", err)
	}

	// Ping the database to ensure connection is real
	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("❌ MongoDB is reachable but not responding:", err)
	}

	Database = Client.Database("peerpulse")
	fmt.Println("✅ Connected to MongoDB at", mongoURI)
}