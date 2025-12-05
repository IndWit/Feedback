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

var Client *mongo.Client
var Database *mongo.Database

func Connect() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Docker Logic: If env variable exists, use it. Otherwise default to localhost.
	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		mongoURI = "mongodb://localhost:27017"
	}

	var err error
	Client, err = mongo.Connect(ctx, options.Client().ApplyURI(mongoURI))
	if err != nil {
		log.Fatal("❌ Could not connect to MongoDB:", err)
	}

	// Ping to verify
	err = Client.Ping(ctx, nil)
	if err != nil {
		log.Fatal("❌ MongoDB reachable but not responding:", err)
	}

	Database = Client.Database("peerpulse")
	fmt.Println("✅ Connected to MongoDB at", mongoURI)
}