package config

import (
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	GeminiAPIKey string
	Port         string
}

func Load() (*Config, error) {
	_ = godotenv.Load() // Ignore error if .env doesn't exist

	cfg := &Config{
		GeminiAPIKey: os.Getenv("GEMINI_API_KEY"),
		Port:         os.Getenv("PORT"),
	}

	if cfg.Port == "" {
		cfg.Port = "8080"
	}

	return cfg, nil
}
