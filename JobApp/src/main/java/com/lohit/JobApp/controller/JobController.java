package com.lohit.JobApp.controller;

import com.lohit.JobApp.model.JobPost;
import com.lohit.JobApp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.batch.BatchProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class JobController {

    @Autowired
    private JobService service;


    @GetMapping({"/", "home"})
    public String home() {
        return "home";
    }




    @GetMapping("/addjob")
    public String addJob(Model model) {
        model.addAttribute("jobPost", new JobPost()); // 👈 matches Thymeleaf
        return "addjob";
    }




//
//    @PostMapping("handleForm")
//    public String handleForm(JobPost jobPost) {
//        service.addJob(jobPost);
//        return "success";
//
//    }
//
//    @GetMapping("viewalljobs")
//    public String viewJobs(Model m) {
//        List<JobPost> jobs = service.getAllJobs();
//        m.addAttribute("jobPosts", jobs);
//
//        return "viewalljobs";
//    }

    @PostMapping("/handleForm")
    public String handleForm(@ModelAttribute("jobPost") JobPost jobPost) {
        service.addJob(jobPost);
        return "success"; // success.html template
    }

    @GetMapping("/viewalljobs")
    public String viewJobs(Model m) {
        List<JobPost> jobs = service.getAllJobs();
        m.addAttribute("jobPosts", jobs);
        return "viewalljobs"; // viewalljobs.html template
    }
}


