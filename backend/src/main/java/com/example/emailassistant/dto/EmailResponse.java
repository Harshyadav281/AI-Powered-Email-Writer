package com.example.emailassistant.dto;


public class EmailResponse {
      private String generatedEmail;

      
      
      public EmailResponse(String generatedEmail) {
          this.generatedEmail = generatedEmail;
      }
	  public String getGeneratedEmail() {
		  return generatedEmail;
	  }

	  public void setGeneratedEmail(String generatedEmail) {
		  this.generatedEmail = generatedEmail;
	  }
}
