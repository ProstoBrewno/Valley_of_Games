package com.websites.Valley_of_Games.models;

public class Author {
    private String name;
    private String role;
    private String image;
    private String contactLink;

    public Author(String name, String role, String image, String contactLink) {
        this.name = name;
        this.role = role;
        this.image = image;
        this.contactLink = contactLink;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public String getImage() {
        return image;
    }

    public String getContactLink() {
        return contactLink;
    }
}
