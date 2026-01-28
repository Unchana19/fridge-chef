package repository

import (
	"testing"
)
 
func TestParseBase64Image(t *testing.T) {
    tests := []struct {
        name        string
        dataURL     string
        wantMime    string
        wantErr     bool
    }{
        {
            name:     "valid jpeg",
            dataURL:  "data:image/jpeg;base64,c2FtcGxlZGF0YQ==",
            wantMime: "image/jpeg",
            wantErr:  false,
        },
        {
            name:     "valid png",
            dataURL:  "data:image/png;base64,c2FtcGxlZGF0YQ==",
            wantMime: "image/png",
            wantErr:  false,
        },
        {
            name:     "double image prefix",
            dataURL:  "data:image/image/png;base64,c2FtcGxlZGF0YQ==",
            wantMime: "image/png",
            wantErr:  false,
        },
        {
            name:     "double image prefix jpeg",
            dataURL:  "data:image/image/jpeg;base64,c2FtcGxlZGF0YQ==",
            wantMime: "image/jpeg",
            wantErr:  false,
        },
    }
 
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            _, mimeType, err := parseBase64Image(tt.dataURL)
            if (err != nil) != tt.wantErr {
                t.Errorf("parseBase64Image() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if mimeType != tt.wantMime {
                t.Errorf("parseBase64Image() mimeType = %v, want %v", mimeType, tt.wantMime)
            }
        })
    }
}
