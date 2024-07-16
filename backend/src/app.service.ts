import { Injectable } from '@nestjs/common';

/**
 * Service that handles the core business logic for the application.
 * 
 * The `AppService` class provides methods that can be used by controllers to
 * process and return data.
 */
@Injectable()
export class AppService {

  /**
   * Returns a simple greeting message.
   * 
   * @returns {string} - A greeting message "Hello World!"
   */
  getHello(): string {
    return 'Hello World!';
  }
}
