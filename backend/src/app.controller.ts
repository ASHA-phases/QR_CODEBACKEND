import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Controller that handles incoming requests and returns responses.
 * 
 * The `AppController` class defines the routes and their handlers, delegating
 * the business logic to the `AppService`.
 */
@Controller()
export class AppController {
  /**
   * The constructor injects the `AppService` to use its methods for handling requests.
   * 
   * @param {AppService} appService - The service that contains the business logic.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * Handles GET requests to the root endpoint and returns a greeting message.
   * 
   * @returns {string} - A greeting message "Hello World!"
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
