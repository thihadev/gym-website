import { useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
    const whoWeAre = {
        title: 'Who We Are',
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        image: 'https://via.placeholder.com/400x300', // Replace with your image URL
      };
    
      return (
        <div className="testimonials my-8" id='aboutus'>
        <div className="m-6 space-y-12 flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 ">
            <div className="md:w-1/2 p-10">
              <img
                src={whoWeAre.image}
                alt={whoWeAre.title}
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left space-y-4 flex justify-center flex-col">
              <h2 className="text-3xl font-bold text-gray-300 text-center md:text-left">{whoWeAre.title}</h2>
              <p className="text-gray-400 leading-relaxed text-center md:text-left">{whoWeAre.text}</p>
            </div>
          </div>
        </div>
        </div>
      );
};

export default Testimonials;
