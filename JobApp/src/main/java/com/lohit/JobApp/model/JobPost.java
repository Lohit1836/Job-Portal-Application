package com.lohit.JobApp.model;


import java.util.List;

import org.springframework.stereotype.Component;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data

@Component
public class JobPost {


	private int postId;
	private String postProfile; 
	private String postDesc;
	private Integer reqExperience;
	private List<String> postTechStack;

	public JobPost() {}

	public JobPost(int postId, String postProfile, String postDesc, Integer reqExperience, List<String> postTechStack) {
		this.postId = postId;
		this.postProfile = postProfile;
		this.postDesc = postDesc;
		this.reqExperience = reqExperience;
		this.postTechStack = postTechStack;
	}


}
